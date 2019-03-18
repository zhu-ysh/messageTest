import configData from '../../app.json'
import * as StorageUtil from '../utilities/StorageUtil'
import * as StringUtil from '../utilities/StringUtil'
import IMEventEmitter from '../utilities/EventUtil'
import protobuf from '../photo/InstantMessageInfo'
import * as tioService from './TioService'
import msgService from './InstantMessageService'

class WebsocketService {
  isInited = false
  forceClose = false

  constructor () {
    this.heartbeatSendInterval = configData.websocket.heartbeatTimeout / 2
  }

  async init () {
    if (this.isInited) {
      return
    }

    const token = await StorageUtil.getString('token')
    this.currentUser = await StorageUtil.getObject('user')

    this.url = `${configData.wsUrl}?token=${token}`
    this.reconnUrl = `${configData.wsUrl}?tiows_reconnect=true&token=${token}`

    this.isInited = true
    
    this.addListener()
  }

  addListener () {
    IMEventEmitter.addListener('onWebSocketOpen', (event) => {
      console.log('onWebSocketOpen')
      console.log(event)
    })
    
    IMEventEmitter.addListener('onWebSocketClose', (event) => {
      console.log('onWebSocketClose')
      console.log(event)
    })
    
    IMEventEmitter.addListener('onWebSocketError', (event) => {
      console.log('onWebSocketError')
      console.log(event)
    })
  }

  lastInteractionTime = (timeValue) => {
    this.lastInteractionTimeValue = timeValue
  }

  connect (isReconnect) {
    var _url = this.url
    if (isReconnect) {
      _url = this.reconnUrl
    }
    var ws = new WebSocket(_url)
    this.ws = ws

    ws.binaryType = configData.websocket.binaryType || 'arraybuffer' // 'arraybuffer'; // 'blob' or 'arraybuffer';//arraybuffer是字节
    var self = this

    ws.onopen = function (event) {
      self.lastInteractionTime(new Date().getTime())

      self.pingIntervalId = setInterval(function () {
        self.ping(self)
      }, self.heartbeatSendInterval)

      IMEventEmitter.emit('onWebSocketOpen', event)
    }

    ws.onmessage = function (event) {
      self.lastInteractionTime(new Date().getTime())

      let reader = new FileReader()
      reader.readAsDataURL(event.data)
  
      reader.onload = (evt) => {
        const buf = StringUtil.base64ToUintArray(reader.result)

        const info = protobuf.InstantMessageInfo.decode(buf)
        
        if (info.ContentType === 'Command') {
          switch(info.MessageId) {
            case 'GetUndoResponse':
              tioService.getUndoResponse(info)
              break
            case 'GetFriendsResponse':
              tioService.getFriendsResponse(info)
              break
            case 'QueryFriendsResponse':
              tioService.queryFriendsResponse(info)
              break
            case 'GetGroupDetailResponse':
              tioService.getGroupDetailResponse(info)
              break
            case 'GetGroupsResponse':
              tioService.getGroupsResponse(info)
              break
            case 'QueryGroupsResponse':
              tioService.queryGroupsResponse(info)
              break
          }
        } else {
          if (info.SenderCode === self.currentUser.oguCode) {
            msgService.processSendMessageInfo(info)
      
            IMEventEmitter.emit('onWebSocketSendMessage', info) // 主要作用是将录入框内容情况，且更新页面消息列表State
          } else {
            msgService.processReceiveMessage(info)

            IMEventEmitter.emit('onWebSocketReceiveMessage', info) // 主要作用更新页面消息列表State
          }
        }
      }
    }

    ws.onclose = function (event) {
      clearInterval(self.pingIntervalId) // clear send heartbeat task

      try {
        IMEventEmitter.emit('onWebSocketClose', event)
      } catch (error) {}

      if (!this.forceClose) {
        if (self.ws) {
          self.reconn(event)
        }
      }
    }

    ws.onerror = function (event) {
      IMEventEmitter.emit('onWebSocketError', event)
    }

    return ws
  }

  reconn (event) {
    var self = this
    setTimeout(function () {
      var ws = self.connect(true)
      self.ws = ws
    }, configData.websocket.reconnInterval)
  }

  ping () {
    var iv = new Date().getTime() - this.lastInteractionTimeValue // 已经多久没发消息了
    // 单位：秒
    if ((this.heartbeatSendInterval + iv) >= configData.websocket.heartbeatTimeout) {
      this.ws.send('ping')
    }
  }

  send (info) {
    const data = protobuf.InstantMessageInfo.encode(info).finish()
    
    this.ws.send(data)
  }

  disonnect () {
    this.forceClose = true
    this.ws.close()
    this.ws = null
  }
  
}

export default new WebsocketService()
