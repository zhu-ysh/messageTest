import shortid from 'shortid'
import dayjs from 'dayjs'

import protobuf from '../photo/InstantMessageInfo'
import SQLiteUtil from '../utilities/SQLiteUtil'

class InstantMesageService {

  init = async () => {
    await SQLiteUtil.open()

    const createTableSql = `CREATE TABLE IF NOT EXISTS MessageInfo (
MessageId TEXT PRIMARY KEY,
ChatCode TEXT,
ChatName TEXT,
ChatAvatar TEXT,
SenderCode TEXT,
SenderName TEXT,
SenderAvatar TEXT,
ReceiverCode TEXT,
ReceiverName TEXT,
ReceiverAvatar TEXT,
ReceiverType TEXT,
ContentType TEXT,
Content TEXT,
MessageTime INTEGER,
FileName TEXT,
ReadFlag INTEGER
    )`
    const createIndexSql = 'CREATE INDEX IF NOT EXISTS IdxChat ON MessageInfo(ChatCode)'

    const stmtList = [
      {
        sql: createTableSql,
        params: null
      },
      {
        sql: createIndexSql,
        params: null
      }
    ]

    await SQLiteUtil.executeList(stmtList)
  }

  destroy = async () => {
    if (SQLiteUtil) {
      await SQLiteUtil.close()
    }
  }

  convertResult = (res) => {
    let result = []
    if (res && res[0].rows) {
      var len = res[0].rows.length
      for (let i = 0; i < len; i++) {
        result.push(res[0].rows.item(i))
      }
    }

    return result
  }

  getChatList = async () => {
    const res = await SQLiteUtil.executeSql(`SELECT A.ChatCode, ChatName, ChatAvatar, ReceiverType, MaxTime, UnreadCount, Content AS LastContent FROM MessageInfo A,
(SELECT ChatCode, MAX(MessageTime) AS MaxTime, SUM(CASE WHEN ReadFlag = 0 THEN 1 ELSE 0 END) AS UnreadCount FROM MessageInfo GROUP BY ChatCode) B
WHERE A.ChatCode = B.ChatCode AND A.MessageTime = B.MaxTime
`)
    return this.convertResult(res)
  }

  getMessageSearchResult = async (key) => {
    const res = await SQLiteUtil.executeSql(`SELECT MessageId, ChatCode, ChatName, ChatAvatar, ReceiverType, Content FROM MessageInfo WHERE Content LIKE '%${key}%'`)

    return this.convertResult(res)
  }

  addMessage = async (msgInfo) => {
    await SQLiteUtil.executeSql('INSERT INTO MessageInfo VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', Object.values(msgInfo))
  }

  setMessageReadById = async (messageId) => {
    await SQLiteUtil.executeSql('UPDATE MessageInfo SET ReadFlag = 1 WHERE MessageId = ?', [messageId])
  }
  
  getMessageListByChat = async (ChatCode, messageId) => {
    let res

    if (messageId) {
      const sql = `SELECT * FROM (SELECT * FROM MessageInfo WHERE ChatCode = ? AND MessageTime < (SELECT MessageTime FROM MessageInfo WHERE MessageId = ?) ORDER BY MessageTime DESC LIMIT 10) AAA ORDER BY MessageTime`
      res = await SQLiteUtil.executeSql(sql, [conversationId, messageId])
    } else {
      const sql = `SELECT * FROM (SELECT * FROM MessageInfo WHERE ChatCode = ? ORDER BY MessageTime DESC LIMIT 10) AAA ORDER BY MessageTime`
      res = await SQLiteUtil.executeSql(sql, [ChatCode])
    }

    return this.convertResult(res)
  }

  getUnreadMessageListByChat = async (ChatCode) => {
    const sql = `SELECT * FROM MessageInfo WHERE ChatCode = ? AND ReadFlag = 0 ORDER BY MessageTime`
    const res = await SQLiteUtil.executeSql(sql, [ChatCode])

    return this.convertResult(res)
  }

  getMessageInfoById = async (messageId) => {
    const res = await SQLiteUtil.executeSql('SELECT * FROM MessageInfo WHERE MessageId = ?', [messageId])
    return this.convertResult(res)
  }
  
  convertProtoToDbInfo = (readFlag, protoMsgInfo) => {
    let dbMsgInfo = {
      MessageId: protoMsgInfo.MessageId,
      ChatCode: protoMsgInfo.ChatCode,
      ChatName: protoMsgInfo.ChatName,
      ChatAvatar: protoMsgInfo.ChatAvatar,
      SenderCode: protoMsgInfo.SenderCode,
      SenderName: protoMsgInfo.SenderName,
      SenderAvatar: protoMsgInfo.SenderAvatar,
      ReceiverId: protoMsgInfo.ReceiverId,
      ReceiverName: protoMsgInfo.ReceiverName,
      ReceiverAvatar: protoMsgInfo.ReceiverAvatar,
      ReceiverType: protoMsgInfo.ReceiverType,
      ContentType: protoMsgInfo.ContentType,
      Content: protoMsgInfo.StringContent,
      MessageTime: protoMsgInfo.MessageTime,
      FileName: protoMsgInfo.FileName,
      ReadFlag: readFlag
    }

    return dbMsgInfo
  }

  processSendMessageInfo = async (messageInfo) => {
    let dbMsgInfo = this.convertProtoToDbInfo(true, messageInfo)

    await this.addMessage(dbMsgInfo)
  }

  processReceiveMessageInfo = async (messageInfo) => {
    let dbMsgInfo = this.convertProtoToDbInfo(false, messageInfo)

    await this.addMessage(dbMsgInfo)
  }

  
  getRequestTextMessageInfo = (currentUser, chatCode, chatName, chatAvatar, receiverType, receiverCode, receiverName, receiverAvatar, msgText) => {
    let messageInfo = this.innerGetRequestMessageInfo(currentUser, chatCode, chatName, chatAvatar, receiverType, receiverCode, receiverName, receiverAvatar)
    
    messageInfo.ContentType = 'Text'
    messageInfo.StringContent = msgText
    messageInfo.FileName = ''

    return messageInfo
  }

  getRequestByteMessageInfo = (currentUser, chatCode, chatName, chatAvatar, receiverType, receiverCode, receiverName, receiverAvatar, contentType, fileName, content) => {
    let messageInfo = this.innerGetRequestMessageInfo(currentUser, chatCode, chatName, chatAvatar, receiverType, receiverCode, receiverName, receiverAvatar)
    
    messageInfo.ContentType = contentType
    messageInfo.FileName = fileName
    messageInfo.StringContent = size

    return messageInfo
  }

  innerGetRequestMessageInfo = (currentUser, chatCode, chatName, chatAvatar, receiverType, receiverCode, receiverName, receiverAvatar) => {
    let messageInfo = new protobuf.InstantMessageInfo()

    messageInfo.MessageId = shortid.generate()
    messageInfo.ChatCode = chatCode
    messageInfo.ChatName = chatName
    messageInfo.ChatAvatar = chatAvatar
    messageInfo.SenderCode = currentUser.oguCode
    messageInfo.SenderName = currentUser.oguName
    messageInfo.SenderAvatar = currentUser.avatar
    messageInfo.ReceiverCode = receiverCode
    messageInfo.ReceiverName = receiverName
    messageInfo.ReceiverAvatar = receiverAvatar
    messageInfo.ReceiverType = receiverType
    messageInfo.MessageTime = dayjs().unix()

    return messageInfo
  }
}

export default new InstantMesageService()
