import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, FlatList, TouchableHighlight } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import configData from '../../../app.json'
import * as CommonUtil from '../../utilities/CommonUtil'
import * as TimeUtil from '../../utilities/TimeUtil'
import * as StorageUtil from '../../utilities/StorageUtil'
import service from '../../services/InstantMessageService'
import * as apiService from '../../services/ApiService'

import { TitleBar } from '../../components'

export default class ChatContainer extends Component {
  // 底部Tab栏
  static navigationOptions = {
    title: '对话',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (<FontAwesome name='comments' size={30} style={styles.tabBarIcon} color="#52C0FE"></FontAwesome>)
      } else {
        return (<FontAwesome name='comments' size={30} style={styles.tabBarIcon}></FontAwesome>)
      }
    }
  }

  constructor(props) {
    super(props)
    
    this.state = {
      currentUser: {},
      chatList: []
    }
  }

  async componentDidMount () {
    const user = await StorageUtil.getObject('user')
    const chatList = await service.getChatList()
    this.setState({
      currentUser: user,
      chatList: chatList
    })
  }

  // 点击某个聊天，然后根据单聊还是群聊进行跳转
  _onNavigateChat = async (item) => {
    if (item.ReceiverType === 'USER') {
      const user = await apiService.getUser(item.ChatCode)
      this.props.navigation.navigate('SingleChat', { user: user })
    } else if (item.ReceiverType === 'GROUP') {
      // const group = await apiService.getUserGroupList()
      this.props.navigation.navigate('GroupChat', { group: item })
    }
  }

  // 每个聊天的展示
  _renderItem = ({ item }) => {
    const avatar = item.ChatAvatar ? { uri: `${configData.remoteUrl}/avatars/${item.ChatAvatar}` } : require('../../images/avatar.png')

    return (
      <View>
        <TouchableHighlight underlayColor="#D9D9D9" onPress={() => {this._onNavigateChat(item)}}>
          <View style={listItemStyles.container}>
            <Image source={avatar} style={{width: 50, height: 50}}></Image>
            <View style={listItemStyles.textContainer}>
              <View style={listItemStyles.subContainer}>
                <Text numberOfLines={1} style={listItemStyles.title}>{item.ChatName}</Text>
                <Text numberOfLines={1} style={listItemStyles.time}>{TimeUtil.formatChatTime(item.MaxTime)}></Text>
              </View>
              <View style={listItemStyles.subContainer}>
                <Text numberOfLines={1} style={listItemStyles.subtitle}>{item.LastContent}</Text>
                {
                  item.UnreadCount > 0 ? (
                    <View style={listItemStyles.redDot}>
                      <Text style={listItemStyles.redDotText}>{item.UnreadCount}</Text>
                    </View>
                  ) : ( null )
                }
                </View>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.divider}/>
      </View>
    )
  }
  
  _keyExtractor = (item, index) => item.ChatCode

  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#393A3E" barStyle="light-content"></StatusBar>
        <TitleBar text={"对话列表"} goback={false}></TitleBar>
        <View style={styles.divider}></View>
        <View style={styles.content}>
        {
          this.state.chatList.length === 0 ? 
            (<Text style={styles.emptyHintText}>无会话消息</Text>) :
            (<FlatList data={this.state.chatList} renderItem={this._renderItem} keyExtractor={this._keyExtractor}></FlatList>)
        }
        </View>
        <View style={styles.divider}></View>
      </View>
    )
  }
}

const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: CommonUtil.screenWidth,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 15,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 16,
    flex: 1,
  },
  time: {
    color: '#999999',
    fontSize: 12,
  },
  subtitle: {
    color: '#999999',
    fontSize: 14,
    marginTop: 3,
    flex: 1,
  },
  redDot: {
    borderRadius: 90,
    width: 18,
    height: 18,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  redDotText: {
    color: '#FFFFFF',
    fontSize: 14,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: CommonUtil.screenWidth,
    height: CommonUtil.dividerSize,
    backgroundColor: CommonUtil.dividerColor
  },
  content: {
    flex: 1,
    width: CommonUtil.screenWidth,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonUtil.pageBackgroundColor
  },
  emptyHintText: {
    fontSize: 18,
    color: '#999999'
  },
  tabBarIcon: {
    width: CommonUtil.iconWidth,
    height: CommonUtil.iconHeight,
  }
})
