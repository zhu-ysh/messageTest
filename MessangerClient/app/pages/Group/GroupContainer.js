import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import * as CommonUtil from '../../utilities/CommonUtil'

export default class GroupContainer extends Component {
  // 底部Tab栏
  static navigationOptions = {
    title: '群组',
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
  }

  render () {
    return (
      <View>
        <Text>GroupContainer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabBarIcon: {
    width: CommonUtil.iconWidth,
    height: CommonUtil.iconHeight,
  }
})

