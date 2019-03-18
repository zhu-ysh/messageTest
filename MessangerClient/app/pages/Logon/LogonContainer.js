import React, { Component } from 'react'
import { View, TextInput, Image, Button, StyleSheet } from 'react-native'

import * as StorageUtil from '../../../app/utilities/StorageUtil'
import * as CommonUtil from '../../../app/utilities/CommonUtil'
import SQLiteUtil from '../../../app/utilities/SQLiteUtil'
import SocketUtil from '../../../app/services/WebsocketService'
import * as service from '../../../app/services/ApiService'
import messageService from '../../../app/services/InstantMessageService'

export default class LogonContainer extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      logonInfo: {
        userCode: '',
        password: ''
      }
    }
  }

  changeUserCodeHandler = (userCode) => {
    this.setState({
      logonInfo: {
        ...this.state.logonInfo,
        userCode: userCode
      }
    })
  }

  changePasswordHandler = (password) => {
    this.setState({
      logonInfo: {
        ...this.state.logonInfo,
        password: password
      }
    })
  }
  
  logonHandler = async () => {
    const auth = await service.logon(this.state.logonInfo)
    
    await StorageUtil.setObject('user', auth.user)
    await StorageUtil.setString('token', auth.token)
    
    await messageService.init()

    await SQLiteUtil.open()
    await SocketUtil.init()

    SocketUtil.connect(false)

    this.props.navigation.navigate('RootStack')
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.img} />
          <TextInput placeholder={'请输入用户名'} value={this.state.logonInfo.userCode} onChangeText={userCode => this.changeUserCodeHandler(userCode)} />
          <TextInput placeholder={'请输入密码'} value={this.state.logonInfo.password} onChangeText={password => this.changePasswordHandler(password)} textContentType={'password'} />
          <Button onPress={this.logonHandler} title="登录" />
        </View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonUtil.backgroundColor
  },
  img: {
    width: 30,
    height: 30,
  },
})
