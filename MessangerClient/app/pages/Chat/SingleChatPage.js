import React, { Component } from 'react'
import { Keyboard, FlatList, Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Linking } from 'react-native'
import { AudioRecorder, AudioUtils, AudioSource } from 'react-native-audio'
import Sound from 'react-native-sound'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RNFS from 'react-native-fs'
import shortid from 'shortid'

import configData from '../../../app.json'
import IMEventEmitter from '../../utilities/EventUtil'
import * as CommonUtil from '../../utilities/CommonUtil'
import * as StoageUtil from '../../utilities/StorageUtil'
import * as TimeUtil from '../../utilities/TimeUtil'
import * as StringUtil from '../../utilities/StringUtil'
import msgService from '../../services/InstantMessageService'
import wsService from '../../services/WebsocketService'
import * as apiService from '../../services/ApiService'

import { EmojiView, MoreView, TitleBar } from '../../components';

const BAR_STATE_SHOW_KEYBOARD = 1
const BAR_STATE_SHOW_RECORDER = 2

export default class SingleChatPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      showEmojiView: false,
      showMoreView: false,
      showKeyboardView: false,
      user: this.props.navigation.state.params.user,
      messages: [],
      inputMsg: '',
      barState: BAR_STATE_SHOW_KEYBOARD,
      cursorIndex: 0,
      height: 0,
      refreshing: false,
      audioPermission: false,
      audioRecording: false
    }
  }

  async componentDidMount () {
    const currentUser = await StoageUtil.getObject('user')

    let messages = await msgService.getUnreadMessageListByChat(this.state.user.oguCode)
    if (!messages || messages.length === 0) {
      messages = await msgService.getMessageListByChat(this.state.user.oguCode)
    }

    this.setState({
      currentUser: currentUser,
      messages: messages
    })

    IMEventEmitter.addListener('onWebSocketSendMessage', (info) => {
      const dbInfo = msgService.convertProtoToDbInfo(true, info)

      this.setState({
        messages: [...this.state.messages, dbInfo]
      })
    })

    IMEventEmitter.addListener('onWebSocketReceiveMessage', (info) => {
      const dbInfo = msgService.convertProtoToDbInfo(true, info)

      this.setState({
        messages: [...this.state.messages, dbInfo]
      })

      msgService.setMessageReadById(info.MessageId)
    })

    this.scroll()

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._onKeyboardDidShow);  //keyboardWillShow
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._onKeyboardDidHide);  //keyboardWillHide


    const audioPermission = await AudioRecorder.requestAuthorization()
    this.setState({ audioPermission: audioPermission })

    AudioRecorder.onFinished = (data) => {
      RNFS.readFile(data.audioFileURL, 'base64').then(res => {
        const u8arr = StringUtil.base64ToUintArray(res)

        let fileName = data.audioFileURL.substring(data.audioFileURL.lastIndexOf('/') + 1, data.audioFileURL.length)
        this.handleSendAudioMessage({
          fileName: fileName,
          data: u8arr
        }).then(() => {})
      })
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();

    IMEventEmitter.removeAllListeners('onWebSocketSendMessage')
    IMEventEmitter.removeAllListeners('onWebSocketReceiveMessage')

    this.scrollTimeout && clearTimeout(this.scrollTimeout)
  }

  scroll = () => {
    this.scrollTimeout = setTimeout(() => this.refs.flatList.scrollToEnd(), 0)
  }

  _onRefresh = async () => {
    this.setState({
      refreshing: true
    })

    const messageId = (this.state.messages && this.state.messages.length > 0) ? this.state.messages[0].MessageId : ''
    let messages = await msgService.getMessageListByChat(this.state.user.oguCode, messageId)

    this.setState({
      messages: [...messages, ...this.state.messages],
      refreshing: false
    })
  }

  _keyExtractor = (item, index) => item.MessageId

  _renderItem = ({ item, index }) => {
    const contentType = item.ContentType
    const isReceive = item.SenderCode !== this.state.currentUser.oguCode

    if (contentType === 'Text') {
      if (isReceive) {
        return this._renderReceiveTextMessage(item, index)
      } else {
        return this._renderSendTextMessage(item, index)
      }
    } else if (contentType === 'Image') {
      if (isReceive) {
        return this._renderReceiveImageMessage(item, index)
      } else {
        return this._renderSendImageMessage(item, index)
      }
    }
  }

  // 显示消息部分--开始
  _renderReceiveTextMessage = (item, index) => {
    let avatar = item.ReceiverAvatar ? { uri: `${configData.remoteUrl}/avatars/${item.ReceiverAvatar}` } : require('../../images/avatar.png')
    
    const contentArray = StringUtil.matchContentString(item.Content)
    let displayList = contentArray.map((c,i) => {
      if (c.type === 'text') {
        return (<Text style={listStyles.messageText} key ={`${item.MessageId}-${i}`}>{c.text}</Text>)
      } else if (c.type === 'name') {
        return (<Text style={[listStyles.messageText, { color: 'green' }]} key={`${item.MessageId}-${i}`}>{c.text}</Text>)
      } else if (c.type === 'http') {
        return (
          <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(c.text)}>
            <Text style={[listStyles.messageText, { color: 'red' }]} key={`${item.MessageId}-${i}`}>{c.text}</Text>
          </TouchableOpacity>
        )
      }
    })

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.container}>
          <Image style={listStyles.avatar} source={avatar}></Image>
          <View style={listStyles.messageContainer}>
          {
            displayList
          }
          </View>
        </View>
      </View>
    )
  }

  _renderSendTextMessage = (item, index) => {
    const avatar = this.state.currentUser.avatar ? { uri: `${configData.remoteUrl}/avatars/${this.state.currentUser.avatar}` } : require('../../images/avatar.png')
    
    const contentArray = StringUtil.matchContentString(item.Content)
    let displayList = contentArray.map((c,i) => {
      if (c.type === 'text') {
        return (<Text style={listStyles.messageText} key={`${item.MessageId}-${i}`}>{c.text}</Text>)
      } else if (c.type === 'name') {
        return (<Text style={[listStyles.messageText, { color: 'green' }]} key={`${item.MessageId}-${i}`}>{c.text}</Text>)
      } else if (c.type === 'http') {
        return (
          <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(c.text)}>
            <Text style={[listStyles.messageText, { color: 'red' }]} key={`${item.MessageId}-${i}`}>{c.text}</Text>
          </TouchableOpacity>
        )
      }
    })

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.containerSend}>
          <View style={listStyles.messageContainerSend}>
          {
            displayList
          }
          </View>
          <Image style={listStyles.avatar} source={avatar}></Image>
        </View>
      </View>
    )
  }

  _renderReceiveImageMessage = (item, index) => {
    const avatar = item.ReceiverAvatar ? { uri: `${configData.remoteUrl}/avatars/${item.ReceiverAvatar}` } : require('../../images/avatar.png')
    const width = Number(item.Content.split('*')[0])
    const height = Number(item.Content.split('*')[1])
    const thumbFileName = `${configData.remoteUrl}/downloadFile?messageId=${item.MessageId}&thumb=true`
    const fileName = `${configData.remoteUrl}/downloadFile/?messageId=${item.MessageId}`

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.container}>
          <Image style={listStyles.avatar} source={avatar}></Image>
          <View style={[listStyles.messageContainer, {paddingLeft: 0, paddingRight: 0}]}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(fileName)}>
              <Image source={{uri: thumbFileName}} style={{width: 150, height: 150 * (height / width)}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  _renderSendImageMessage = (item, index) => {
    const avatar = this.state.currentUser.avatar ? { uri: `${configData.remoteUrl}/avatars/${this.state.currentUser.avatar}` } : require('../../images/avatar.png')
    const width = Number(item.Content.split('*')[0])
    const height = Number(item.Content.split('*')[1])
    const thumbFileName = `${configData.remoteUrl}/downloadFile?messageId=${item.MessageId}&thumb=true`
    const fileName = `${configData.remoteUrl}/downloadFile/?messageId=${item.MessageId}`

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.containerSend}>
          <View style={[listStyles.messageContainerSend, {paddingLeft: 0, paddingRight: 0}]}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(fileName)}>
              <Image source={{uri: thumbFileName}} style={{width: 150, height: 150 * (height / width)}}></Image>
            </TouchableOpacity>
          </View>
          <Image style={listStyles.avatar} source={avatar}/>
        </View>
      </View>
    )
  }

  _renderReceiveVideoMessage = (item, index) => {
    const avatar = item.ReceiverAvatar ? { uri: `${configData.remoteUrl}/avatars/${item.ReceiverAvatar}` } : require('../../images/avatar.png')
    const width = Number(item.Content.split('*')[0])
    const height = Number(item.Content.split('*')[1])
    const thumbFileName = `${configData.remoteUrl}/downloadFile?messageId=${item.MessageId}&thumb=true`
    const fileName = `${configData.remoteUrl}/downloadFile/?messageId=${item.MessageId}`

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.container}>
          <Image style={listStyles.avatar} source={avatar}></Image>
          <View style={[listStyles.messageContainer, {paddingLeft: 0, paddingRight: 0}]}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(fileName)}>
              <Image source={{uri: thumbFileName}} style={{width: 150, height: 150 * (height / width)}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  _renderSendVideoMessage = (item, index) => {
    const avatar = this.state.currentUser.avatar ? { uri: `${configData.remoteUrl}/avatars/${this.state.currentUser.avatar}` } : require('../../images/avatar.png')
    const width = Number(item.Content.split('*')[0])
    const height = Number(item.Content.split('*')[1])
    const thumbFileName = `${configData.remoteUrl}/downloadFile?messageId=${item.MessageId}&thumb=true`
    const fileName = `${configData.remoteUrl}/downloadFile/?messageId=${item.MessageId}`

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.containerSend}>
          <View style={[listStyles.messageContainerSend, {paddingLeft: 0, paddingRight: 0}]}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(fileName)}>
              <Image source={{uri: thumbFileName}} style={{width: 150, height: 150 * (height / width)}}></Image>
            </TouchableOpacity>             
          </View>
          <Image style={listStyles.avatar} source={avatar}/>
        </View>
      </View>
    )
  }

  _renderReceiveAudioMessage = (item, index) => {
    const avatar = item.ReceiverAvatar ? { uri: `${configData.remoteUrl}/avatars/${item.ReceiverAvatar}` } : require('../../images/avatar.png')
    const fileName = `${configData.remoteUrl}/downloadFile/?messageId=${item.MessageId}`

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.container}>
          <Image style={listStyles.avatar} source={avatar}></Image>
          <View style={[listStyles.messageContainer, {paddingLeft: 0, paddingRight: 0}]}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(fileName)}>
              <Image source={require('../../images/dept.png')} style={{width: 40, height: 40}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  _renderSendAudioMessage = (item, index) => {
    const avatar = this.state.currentUser.avatar ? { uri: `${configData.remoteUrl}/avatars/${this.state.currentUser.avatar}` } : require('../../images/avatar.png')
    const fileName = `${configData.remoteUrl}/downloadFile/?messageId=${item.MessageId}`

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {
          this.shouldShowTime(item, index) ? (<Text style={listStyles.time}>{TimeUtil.formatChatTime(parseInt(item.MessageTime))}</Text>) : (null)
        }
        <View style={listStyles.containerSend}>
          <View style={[listStyles.messageContainerSend, {paddingLeft: 0, paddingRight: 0}]}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onOpenLink(fileName)}>
              <Image source={require('../../images/dept.png')} style={{width: 40, height: 40}}></Image>
            </TouchableOpacity>             
          </View>
          <Image style={listStyles.avatar} source={avatar}/>
        </View>
      </View>
    )
  }

  _onOpenLink = (url) => {
    Linking.openURL(url)
  }

  shouldShowTime(item, index) { // 该方法判断当前消息是否需要显示时间
    if (index === 0) {
      // 第一条消息，显示时间
      return true
    }

    if (index > 0) {
      let messages = this.state.messages

      if (messages && messages.length > 0) {
        let preMsg = messages[index - 1]
        let delta = item.MessageTime - preMsg.MessageTime

        if (delta > 3 * 60) {
          return true
        }
      }

      return false
    }
  }
  // 显示消息部分--结束


  // 处理发送的消息--开始
  handleSendTextMessage = () => {
    let msgInfo = msgService.getRequestTextMessageInfo(this.state.currentUser, this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar,
      'USER', this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar, this.state.inputMsg)

      this.setState({
        inputMsg: '',
        cursorIndex: 0,
        height: 0
      })
  
      wsService.send(msgInfo)
  }

  handleSendImageMessage = async (image) => {
    // 上传文件
    const fileName = await apiService.uploadFile(image.fileName, image.data)

    let msgInfo = msgService.getRequestByteMessageInfo(this.state.currentUser, this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar,
      'USER', this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar, image.info.mime, fileName, `${image.info.width}*${image.info.height}`)

    this.setState({
      inputMsg: '',
      cursorIndex: 0,
      height: 0
    })

    wsService.send(msgInfo)
  }

  handleSendAudioMessage = async (audio) => {
    const fileName = await apiService.uploadFile(audio.fileName, audio.data)

    let msgInfo = msgService.getRequestByteMessageInfo(this.state.currentUser, this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar,
      'USER', this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar, 'audio/x-mei-aac', fileName, '')

    this.setState({
      inputMsg: '',
      cursorIndex: 0,
      height: 0
    })

    wsService.send(msgInfo)
  }

  handleSound = (item) => {
    // todo: 下载文件到

    var sound = new Sound(item.FileName, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });
    setTimeout(() => {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 100);
  }

  handleSendFileMessage = (file) => {
    const fileName = await apiService.uploadFile(file.fileName, file.data)

    let msgInfo = msgService.getRequestByteMessageInfo(this.state.currentUser, this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar,
      'USER', this.state.user.oguCode, this.state.user.oguName, this.state.user.avatar, 'application/octet-stream', fileName, '')
      
    this.setState({
      inputMsg: '',
      cursorIndex: 0,
      height: 0
    })

    wsService.send(msgInfo)
  }

  prepareRecordingPath = (audioPath) => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    })
  }

  handleRecordSound = async () => {
    if (!this.state.audioPermission) {
      console.log('audioPermission fail')
      return
    }

    const fileName = shortid.generate()
    let audioPath = `${AudioUtils.DocumentDirectoryPath}/${fileName}.aac`

    if (this.state.audioRecording) {
      const filePath = await AudioRecorder.stopRecording();
      console.log(filePath)

      this.setState({
        audioRecording: false
      })
    } else {
      this.prepareRecordingPath(audioPath)

      const filePath = await AudioRecorder.startRecording()
      console.log(filePath)

      this.setState({
        audioRecording: true
      })
    }
  }

  onSelectionChange = (event) => {
    this.setState({
      cursorIndex: event.nativeEvent.selection.start
    })
  }

  onChangeText = (text) => {
    this.setState({
      inputMsg: text
    })
  }

  onSelectEmoji = (emoji) => {
    // this.textInput.focus()

    // let selection = this.textInput._lastNativeSelection || null
    // const emojiStringLength = emoji.key.length

    // if (!this.state.inputMsg) {
    //   this.setState({
    //     inputMsg: this.state.inputMsg + emoji.key
    //   }, () => {
    //     let position =  this.state.inputMsg.length

    //     this.textInput.focus()
    //     setTimeout(() => {
    //       this.textInput.setNativeProps({
    //           selection : { start: position, end: position}
    //       })
    //     }, 10)
    //   })
    // } else if (selection != null && selection.start == selection.end) {
    //   let startStr = this.state.inputMsg.substr(0 , selection.start)
    //   let endStr = this.state.inputMsg.substr(selection.start)
      
    //   this.setState({
    //     inputMsg: startStr + emoji.key + endStr
    //   }, () => {
    //     let position =  selection.start + emojiStringLength

    //     this.textInput.focus()
    //     setTimeout(() => {
    //       this.textInput.setNativeProps({
    //         selection: { start: position, end: position }
    //       })
    //     }, 10)
    //   })
    // } else {
    //   this.setState({
    //     inputMsg : this.state.inputMsg + emoji.key
    //   }, () => {
    //       let position =  this.state.inputMsg.length

    //       this.textInput.focus()
    //       setTimeout(() => {
    //         this.textInput.setNativeProps({
    //           selection: { start: position, end: position }
    //         })
    //       }, 10)
    //   })
    // }
    this.setState({
      inputMsg : this.state.inputMsg + emoji
    });
  }
  
  onDeleteEmoji = () =>{
    if (this.state.inputMsg.length < 1) {
      return
    }

    let rmSize = -1

    //判断是否双字节
    if (/[\u0391-\uFFE5]$/.test(this.state.inputMsg)) {
      rmSize = -2
    }

    this.setState({
      inputMsg : this.state.inputMsg.slice(0,rmSize)
    })
  }

  renderBottom = () => {
    switch (this.state.barState) {
      case BAR_STATE_SHOW_KEYBOARD:
        return (
          <View style={bottomStyles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.handlePress("soundBtn")}>
              <FontAwesome name="volume-up" style={bottomStyles.icon}></FontAwesome>
            </TouchableOpacity>
            <TextInput value={this.state.inputMsg} multiline={true} onChangeText={(text) => this.onChangeText(text)} 
              ref={t=>this.textInput=t} style={[bottomStyles.input, {height: Math.max(35, this.state.height)}]}
              onSelectionChange={(event) => this.onSelectionChange(event)}
              onContentSizeChange={(e) => { this.setState({ height: e.nativeEvent.contentSize.height }) }}>
            </TextInput>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.handlePress("emojiBtn")}>
            {
              this.state.showEmojiView?(
              <FontAwesome name="keyboard-o" style={bottomStyles.icon}></FontAwesome>):(
              <FontAwesome name="smile-o" style={bottomStyles.icon}></FontAwesome>)
            }
            </TouchableOpacity>
            {
              this.state.inputMsg ? 
              (
                <View style={{marginLeft: 10}}>
                  <Button color={"#49BC1C"} title={"发送"} onPress={() => this.handleSendTextMessage()}/>
                </View>
              ) : (
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.handlePress("moreBtn")}>
                  <FontAwesome name="plus" style={[bottomStyles.icon, {marginLeft: 10}]}></FontAwesome>
                </TouchableOpacity>
              )
            }
          </View>
        )
      case BAR_STATE_SHOW_RECORDER:
        return (
          <View style={bottomStyles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.handlePress("soundBtn")}>
              <FontAwesome name="keyboard-o" style={bottomStyles.icon}></FontAwesome>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={{flex: 1}} onPress={() => this.handleRecordSound()}>
              <View style={bottomStyles.recorder}><Text>{this.state.audioRecording ? '停止录音' : '按住录音'}</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.handlePress("emojiBtn")}>
              <FontAwesome name="smile-o" style={bottomStyles.icon}></FontAwesome>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.handlePres("moreBtn")}>
              <FontAwesome name="plus" style={[bottomStyles.icon, {marginLeft: 10}]}></FontAwesome>
            </TouchableOpacity>
          </View>
        )
    }
  }

  handlePress = (tag) => {
    if ('soundBtn' === tag) {
      if (this.state.barState === BAR_STATE_SHOW_KEYBOARD) {
        this.setState({
          barState: BAR_STATE_SHOW_RECORDER,
          showEmojiView: false,
          showMoreView: false,
        })
      } else if (this.state.barState === BAR_STATE_SHOW_RECORDER) {
        this.setState({
          barState: BAR_STATE_SHOW_KEYBOARD,
          showEmojiView: false,
          showMoreView: false,
        })
      }
    } else if ('emojiBtn' === tag) {
      const {showEmojiView} = this.state;

      if(showEmojiView){
        //如果面板显示中，点击则激活键盘
        this._showKeyboardView();
      }
      else{
        //如果键盘显示中，则隐藏面板
        this._hideKeyboardView();

        this.setState({
          showEmojiView:true,
          showMoreView: false,
        })
      }
    } else if ('moreBtn' === tag) {
      const {showEmojiView,showMoreView} = this.state;

      if(showMoreView){
        //如果面板显示中，点击则激活键盘
        this._showKeyboardView();
      }else{
        //如果键盘显示中，则隐藏面板
        this._hideKeyboardView();

        this.setState({
          showEmojiView: false,
          showMoreView: true
        })
       
      }
    }
  }

  _onKeyboardDidShow = ()=> {
    //键盘显示并隐藏其他面板
    this.setState({
      showKeyboardView:true,
      showMoreView:false,
      showEmojiView:false
    });
  }

  _onKeyboardDidHide = ()=> {
    this.setState({showKeyboardView:false});
  }

  _showKeyboardView = ()=>{
    if(this.state.showKeyboardView){
      return;
    }

    this.textInput.focus(); //给与输入焦点，激活键盘
  }

  _hideKeyboardView = ()=>{
    if(this.state.showKeyboardView){
      Keyboard.dismiss();
    }
  }
  
  render () {
    let moreView = []

    if (this.state.showEmojiView) {
      moreView.push(
        <View key={"emoji"}>
          <View style={styles.divider}></View>
          <View style={{ height: 200 }}>
            <EmojiView onSelectEmoji={this.onSelectEmoji} onDeleteEmoji={this.onDeleteEmoji}></EmojiView>
          </View>
        </View>
      )
    }
    if (this.state.showMoreView) {
      moreView.push(
        <View key={"more"}>
          <View style={styles.divider}></View>
          <View style={{ height: 200 }}>
            <MoreView sendFile={this.handleSendFileMessage} sendImage={this.handleSendImageMessage}></MoreView>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TitleBar goback={true} text={this.state.user.oguName}></TitleBar>
        <View style={styles.content}>
          {/* <ActivityIndicator animating={true} color='red' size="large" /> */}
          <FlatList ref="flatList" data={this.state.messages} renderItem={this._renderItem} keyExtractor={this._keyExtractor} extraData={this.state}
            refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()}></FlatList>
        </View>
        <View style={styles.divider}/>
        <View style={styles.bottomBar}>
          {
            this.renderBottom()
          }
        </View>
        {
          moreView
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: CommonUtil.pageBackgroundColor,
  },
  divider: {
    width: CommonUtil.screenWidth,
    height: CommonUtil.dividerSize,
    backgroundColor: CommonUtil.dividerColor,
  },
  bottomBar: {
    height: 50,
  }
})

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: CommonUtil.screenWidth,
    flexDirection: 'row',
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: CommonUtil.screenWidth / 1.2
  },
  messageContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: CommonUtil.screenWidth / 1.2
  },
  messageText: {
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    flex: 1,
    width: CommonUtil.screenWidth,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  time: {
    backgroundColor: '#D4D4D4',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 11,
  }
})

const bottomStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    padding: 5,
  },
  recorder: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: CommonUtil.dividerSize,
    borderColor: '#6E7377',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
