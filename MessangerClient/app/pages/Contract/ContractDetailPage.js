import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'

import configData from '../../../app.json'
import * as CommonUtil from '../../utilities/CommonUtil'
import * as StorageUtil from '../../utilities/StorageUtil'

import { TitleBar } from '../../components'


export default class ContactDetailPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {},
      user: this.props.navigation.state.params.user
    }
  }

  async componentWillMount () {
    const currentUser = StorageUtil.getObject('user')
    this.setState({
      currentUser: currentUser
    })
  }

  _onChat = () => {
    this.props.navigation.navigate('SingleChat', { user: this.state.user })
  }

  render () {
    const avatar = (this.state.user && this.state.user.avatar) ? { uri: `${configData.remoteUrl}/avatars/${this.state.user.avatar}` } 
      : require('../../images/avatar.png')

    return (
      <View style={styles.container}>
        <TitleBar goback={true} text={this.state.user.oguName}/>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.userContainer}>
              <Image style={styles.avatar} source={avatar}/>
              <View style={styles.userTextContainer}>
                <Text style={styles.text}>{this.state.user.userName}</Text>
              </View>
            </View>
            <View style={styles.regionContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.text}>手机：{this.state.user.mobile}</Text>
              </View>
              <View style={styles.userTextContainer}>
                <Text style={styles.text}>全路径：{this.state.user.pathName}</Text>
              </View>
            </View>
            {
              this.state.currentUser.oguCode == this.state.user.oguCode ? (null) : (
                <View>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => { this._onChat() }}>
                    <View style={styles.positiveBtn}>
                      <Text style={styles.positiveBtnText}>发消息</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EBEBEB',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  userContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
  },
  avatar: {
    width: 65,
    height: 65,
  },
  userTextContainer: {
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
  regionContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  regionText: {
    fontSize: 14,
    color: '#999999'
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  commonFontStyle: {
    color: '#000000',
    fontSize: 16,
    width: CommonUtil.screenWidth / 4,
  },
  galleryImg: {
    width: 60,
    height: 60,
    marginLeft: 5,
    marginRight: 5,
  },
  positiveBtn: {
    backgroundColor: '#19AD17',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    height: 50,
  },
  positiveBtnText: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  normalBtn: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    height: 50,
  },
  normalBtnText: {
    fontSize: 16,
    color: '#000000'
  }
})


