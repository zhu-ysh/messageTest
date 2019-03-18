import { PixelRatio, Dimensions, Platform, NativeModules } from 'react-native'

const { height, width } = Dimensions.get('window') //设置view占满屏幕宽度


export const screenHeight = height //屏幕高度
export const screenWidth = width //屏幕宽度

export const dividerColor = '#D3D3D3'
export const dividerSize = 1 / PixelRatio.get()

export const isAndroid = (Platform.OS === 'android') //安卓设备
export const isIOS = (Platform.OS === 'ios') //IOS
export const viewIOSMarginTop = isIOS ? 20 : 0 //IOS界面距离屏幕顶部特殊处理


/**文字*/
export const titleTextColor = 'white'
export const titleBackgroundColor = '#393A3E'
export const pageBackgroundColor = '#EBEBEB'

export const iconWidth = 24
export const iconHeight = 24

export const _onBackAndroid = (navigator) => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop()
    return true
  }

  if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //最近2秒内按过back键，可以退出应用。
    return false
  }

  this.lastBackPressed = Date.now()
  NativeModules.CustomNativeModule.showToast('再按一次退出应用')

  return true
}
