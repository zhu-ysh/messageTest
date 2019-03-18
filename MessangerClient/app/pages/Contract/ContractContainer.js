import React, { Component } from 'react'
import { View, Text, Image, StatusBar, FlatList, TouchableHighlight, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import configData from '../../../app.json'
import * as CommonUtil from '../../utilities/CommonUtil'
import * as service from '../../services/ApiService'

import { TitleBar } from '../../components'

export default class ContractContainer extends Component {
  // 底部Tab栏
  static navigationOptions = {
    title: '通讯录',
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
      parent: null,
      deptList: [],
      userList: []
    }
  }

  async componentDidMount () {
    const deptList = await service.getDeptList()
    const userList = await service.getUserList()

    this.setState({
      deptList: deptList,
      userList: userList
    })
  }

  _onShowContract = (ogu) => {
    if (ogu.oguType === 'USER') {
      this.props.navigation.navigate('ContractDetail', { user: ogu})
    } else {
      this.setState({
        parent: ogu
      })
    }
  }

  _onGoback = (ogu) => {
    const parent = ogu.parentCode ? this.state.deptList.find(o => o.oguCode === ogu.parentCode) : null
    this.setState({
      parent: parent
    })
  }

  _keyExtractor = (item, index) => item.oguCode

  _renderItem = ({ item }) => {
    let avatar
    if (item.oguType === 'USER') {
      avatar = item.avatar ? { uri: `${configData.remoteUrl}/avatars/${item.avatar}` } : require('../../images/avatar.png')
    } else {
      avatar = require('../../images/dept.png')
    }

    return (
      <View>
        <TouchableHighlight underlayColor="#D9D9D9" onPress={() => {this._onShowContract(item)}}>
          <View style={listItemStyles.container}>
            <Image source={avatar} style={listItemStyles.icon}></Image>
            <View style={styles.subContainer}>
              <Text numberOfLines={1} style={listItemStyles.text}>{item.oguName}</Text>
              <Text numberOfLines={1} style={listItemStyles.subtext}>{item.pathName}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render () {
    const parentCode = this.state.parent ? this.state.parent.oguCode : ''
    const contractList = [...this.state.deptList.filter(ogu => ogu.parentCode === parentCode), ...this.state.userList.filter(ogu => ogu.parentCode === parentCode)]

    let backControl = null
    if (this.state.parent) {
      backControl =
        <TouchableHighlight underlayColor="#D9D9D9" onPress={() => {this._onGoback(this.state.parent)}}>
        <View style={listItemStyles.container}>
          <View style={styles.subContainer}>
            <Text numberOfLines={1} style={listItemStyles.text}>上一级</Text>
          </View>
        </View>
      </TouchableHighlight>
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#393A3E" barStyle="light-content"></StatusBar>
        <TitleBar text={"通讯录"} goback={false}></TitleBar>
        <View style={styles.divider}></View>
        <View style={styles.content}>
        {
          contractList.length === 0 ? 
            (<Text style={styles.emptyHintText}>无机构人员</Text>) :
            (<FlatList data={contractList} renderItem={this._renderItem} keyExtractor={this._keyExtractor}></FlatList>)
        }
        </View>
        <View style={styles.divider}/>
        {
          backControl
        }
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
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#333333',
    fontSize: 16,
    flex: 1,
  },
  subtext: {
    color: '#999999',
    fontSize: 12,
  },
  icon: {
    width: CommonUtil.iconWidth,
    height: CommonUtil.iconHeight,
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
