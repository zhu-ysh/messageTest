import React, { Component } from 'react'
import { StyleSheet, View, Image,Text, ViewPagerAndroid, TouchableHighlight } from 'react-native'
import 'string.fromcodepoint'

import * as CommontUtil from '../utilities/CommonUtil'
import * as StringUtil from '../utilities/StringUtil'

export default EmojiView = (props) => {
  const columnLength = 7
  const rowLength = 3

  _expandEmojiList = ()=>{
    let _emojiList =[];

    StringUtil.emojiFontList.forEach(kp=>{
      for (let i = kp[0]; i <= kp[1]; i++) {
        _emojiList.push(i)
      }
    })

    return _emojiList;
  }

  const emojiList = _expandEmojiList()

  const pageLength = Math.ceil(1.0 * emojiList.length / (columnLength * rowLength - 1))

  // todo: 没有计算正确，需要重新计算
  _renderEmoji = () => {
    let emojiPages = []
    for (let pi = 0; pi < pageLength; pi++) {
      emojiPages.push(
        <View style={styles.pageStyle} key={"pi" + pi}>
        {
          _renderEmojiPage(pi)
        }
        </View>
      )
    }

    return emojiPages
  }

  _renderEmojiPage = (pi) => {
    let rows = []

    for (let ri = 0; ri < rowLength; ri++) {
      let columns = []
      for (let ci = 0; ci < columnLength; ci++) {
        if (ci === columnLength - 1 && ri === rowLength - 1) {
          columns.push(
            <View key={"ci" + ci} style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
              <TouchableHighlight onPress={() => onDeleteEmoji()}>
                <Image source={require('../images/emoji/smiley_del.png')} style={styles.emojiDelIcon} />
              </TouchableHighlight>
            </View>
          )
        } else {
          const emojiIndex = ci + ri * columnLength + pi * (columnLength * rowLength - 1)
          if (emojiIndex >= emojiList.length) continue

          const emojiText = String.fromCodePoint(emojiList[emojiIndex]);

          columns.push(
            <View key={"ci" + ci} style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
              <TouchableHighlight onPress={ () => onSelectEmoji(emojiText) }>
              <Text style={styles.emojiIcon} >{emojiText}</Text>
              </TouchableHighlight>
            </View>
          )
        }
      }

      rows.push(
        <View key={"ri" + ri} style={{flexDirection: 'row', height: 200 / 3}}>
          {columns}
        </View>
      )
    }

    return (
      <View>{rows}</View>
    )
  }

  onDeleteEmoji = () => {
    props.onDeleteEmoji()
  }

  onSelectEmoji = (emoji) => {
    props.onSelectEmoji(emoji)
  }

  return (
    <ViewPagerAndroid style={styles.viewPager} initialPage={1}>
    {
      _renderEmoji()
    }
    </ViewPagerAndroid>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    width: CommontUtil.screenWidth,
    height: 200,
    backgroundColor: '#F4F4F4',
  },
  pageStyle: {
    width: CommontUtil.screenWidth,
    paddingLeft: 5,
    paddingRight: 5,
  },
  emojiIcon: {
    width: 30,
    height: 30,
    fontSize:20
  },
  emojiDelIcon: {
    width: 30,
    height: 24,
  }
})
