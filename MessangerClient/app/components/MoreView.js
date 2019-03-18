import React, { Component } from 'react'
import ImagePicker from 'react-native-image-crop-picker'
import RNFS from 'react-native-fs'
import RNFileSelector from 'react-native-file-selector'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as stringUtil from '../utilities/StringUtil'
import * as CommonUtil from '../utilities/CommonUtil'

const icons = [
  {
    name: '相册',
    icon: 'image'
  },
  {
    name: '拍摄',
    icon: 'camera'
  },
  {
    name: '文件',
    icon: 'folder'
  },
  {
    name: '位置',
    icon: 'map-marker'
  },
  // todo: 语音
  // {
  //   name: '语音',
  //   icon: 'microphone'
  // }
]

export default class MoreView extends Component {
  _renderItem = () => {
    let row = []

    for (let i = 0; i < icons.length; i++) {
      const j = i
      row.push(
        <TouchableOpacity key={i} style={styles.cellContainer} activeOpacity={0.6} onPress={() => this.handleClick(j)}>
          <View style={styles.cellContainer}>
            <View style={styles.cellImgContainer}>
              <FontAwesome name={icons[i].icon} style={styles.cellImage}></FontAwesome>
            </View>
            <Text numberOfLines={1} style={styles.cellText}>{icons[i].name}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return row
  }

  handleClick = (index) => {
    switch (index) {
      case 0:
        this.chooseImage()
        break;
      case 1:
        this.chooseCamera()
        break;
      case 2:
        this.chooseFile()
        break;
      default:
    }
  }

  getFileData = async (filePath) => {
    const strBase64 = await RNFS.readFile(filePath, 'base64')
    const fileData = stringUtil.base64ToUintArray(strBase64)

    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length)

    return { fileData, fileName }
  }

  chooseImage = async () => { // 从相册中选择图片发送
    const image = ImagePicker.openPicker({
      compressImageQuality: 0.8,
      mediaType: 'any'
    })

    if (image.path) {
      const fff = await this.getFileData(image.path)

      this.props.sendImage({
        fileName: fff.fileName,
        data: fff.fileData,
        info: image
      })
    }
  }

  chooseCamera = async () => { // 拍照发送
    const image = await ImagePicker.openCamera({
      compressImageQuality: 0.8,
      mediaType: 'video'
    })

    if (image.path) {
      const fff = await this.getFileData(image.path)

      this.props.sendImage({
        fileName: fff.fileName,
        data: fff.fileData,
        info: image
      })
    }
  }

  chooseFile() { // 文件发送
    RNFileSelector.Show({
      title: '选择文件',
      onDone: (path) => {
        this.getFileData(path).then(({ fileData, fileName }) => {
          debugger
          this.props.sendFile({
            fileName: fileName,
            data: fileData
          })
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.moreViewContainer}>
        <View style={styles.rowContainer}>
          {
            this._renderItem()
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  moreViewContainer: {
    width: CommonUtil.screenWidth,
    height: 200,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F4F4F4'
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 200 / 2 - 20,
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  cellImgContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderWidth: CommonUtil.dividerSize,
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
  cellImage: {
    width: 35,
    height: 35,
  },
  cellText: {
    fontSize: 12,
    width: 55,
    textAlign: 'center'
  }
})
