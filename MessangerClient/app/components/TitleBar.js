import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import * as CommonUtil from '../utilities/CommonUtil'

export default class TitleBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: this.props.text,
      goback: this.props.goback,
      operationList: this.props.operationList
    }
  }

  gobackHandler = () => {
    const { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  render () {
    const { text, goback, operationList } = this.state
    
    /** 左边图片*/
    let gobackControl = null
    if (goback) {
      gobackControl = (<TouchableOpacity style={styles.gobackTouchable} onPress={this.gobackHandler}>
        <FontAwesome name='arrow-left' style={styles.icon}></FontAwesome>
      </TouchableOpacity>)
    }

    let operationControl = null
    if (operationList && operationList.length > 0) {
      const touchList = rightList.map(right => {
        const { iconName, handler } = right

        return (<TouchableOpacity onPress={() => { handler()} }>
          <FontAwesome name={iconName} style={styles.icon}></FontAwesome>
        </TouchableOpacity>)
      })

      operationControl = (<View style={styles.operation}>{{ touchList }}</View>)
    }

    let iOSTop = null
    if (CommonUtil.isIOS) {
      iOSTop = <View style={{backgroundColor: CommonUtil.titleBackgroundColor, height: 20}}/>
    }

    return (
      <View >
        {iOSTop}
        <View style={{ height:44, backgroundColor: CommonUtil.titleBackgroundColor, borderBottomWidth: CommonUtil.dividerSize, borderBottomColor: '#cccccc' }}>
          <View style={styles.containerText}>
            {gobackControl}
            <Text style={{ fontSize: 18, color: CommonUtil.titleTextColor }}>{text}</Text>
            {operationControl}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 44,
  },
  gobackTouchable: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    justifyContent: 'center',
  },
  icon: {
    width: CommonUtil.iconWidth,
    height: CommonUtil.iconHeight,
  },
  operation: {
    position: 'absolute',
    right: 15,
    top: 8,
    bottom: 8,
    justifyContent: 'center',
  },
})
