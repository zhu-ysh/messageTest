import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

import { name as appName } from './app.json'

import ChatContainer from './app/pages/Chat/ChatContainer'
import ContractContainer from './app/pages/Contract/ContractContainer'
import GroupContainer from './app/pages/Group/GroupContainer'
import SettingContainer from './app/pages/Setting/SettingContainer'

import SingleChatPage from './app/pages/Chat/SingleChatPage'
import GroupChatPage from './app/pages/Chat/GroupChatPage'
import ContractListPage from './app/pages/Contract/ContractListPage'
import ContractDetailPage from './app/pages/Contract/ContractDetailPage'
import GroupListPage from './app/pages/Group/GroupListPage'
import GroupDetailPage from './app/pages/Group/GroupDetailPage'

import LogonContainer from './app/pages/Logon/LogonContainer'

const TabNavigator = createBottomTabNavigator({
  Chat: ChatContainer,
  Contract: ContractContainer,
  Group: GroupContainer,
  Setting: SettingContainer,
}, {
  tabBarOptions: {
    activeTintColor: '#45C018',
    inactiveTintColor: '#999999',
    showIcon: true,
    labelStyle: {
      fontSize: 12,
      marginTop: 0,
      marginBottom: 0,
    },
    style: {
      marginBottom: -2,
      backgroundColor: '#FCFCFC',
    },
    tabStyle: {}
  },
  tabBarPosition: 'bottom'
})

const RootStackNavigator = createStackNavigator({
  Home: { screen: TabNavigator },
  SingleChat: { screen: SingleChatPage },
  GroupChat: { screen: GroupChatPage },
  ContractList: { screen: ContractListPage },
  ContractDetail: { screen: ContractDetailPage },
  GroupList: { screen: GroupListPage },
  GroupDetail: { screen: GroupDetailPage },
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})

const LogonStackNavigator = createStackNavigator({
  Logon: { screen: LogonContainer },
}, {
  initialRouteName: 'Logon',
  headerMode: 'none'
})

const AppNavigator = createAppContainer(createSwitchNavigator({
  LogonStack: LogonStackNavigator,
  RootStack: RootStackNavigator
}, {
  initialRouteName: 'LogonStack'
}
))

class RootComponent extends Component {
  async componentDidMount () {
    SplashScreen.hide()
  }
  
  render () {
    return (
      <AppNavigator />
    )
  }
}

AppRegistry.registerComponent(appName, () => RootComponent)
