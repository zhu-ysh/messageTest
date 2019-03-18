import dayjs from 'dayjs'

import protobuf from '../photo/InstantMessageInfo'

export function createGroupRequest (currentUser, groupInfo) {
  let messageInfo = new protobuf.InstantMessageInfo()
  messageInfo.SenderId = currentUser.oguCode
  messageInfo.SenderName = currentUser.oguName
  messageInfo.ContentType = 'Command'
  messageInfo.MessageId = 'CreateGroupRequest'
  messageInfo.ReceiverName = groupInfo.groupName
  messageInfo.StringContent = groupInfo.groupDescription
  messageInfo.StatusCode = groupInfo.groupType
  messageInfo.MessageTime = dayjs().unix()

  return messageInfo
}

export function deleteGroupRequest (currentUser, groupInfo) {
  let messageInfo = new protobuf.InstantMessageInfo()
  messageInfo.SenderId = currentUser.oguCode
  messageInfo.SenderName = currentUser.oguName
  messageInfo.ContentType = 'Command'
  messageInfo.MessageId = 'DeleteGroupRequest'
  messageInfo.ReceiverId = groupInfo.groupId
  messageInfo.ReceiverName = groupInfo.groupName
  messageInfo.MessageTime = dayjs().unix()

  return messageInfo
}

export function joinGroupMemberRequest (currentUser, groupInfo) {
  let messageInfo = new protobuf.InstantMessageInfo()
  messageInfo.SenderId = currentUser.oguCode
  messageInfo.SenderName = currentUser.oguName
  messageInfo.ContentType = 'Command'
  messageInfo.MessageId = 'JoinGroupMemberRequest'
  messageInfo.ReceiverId = groupInfo.groupId
  messageInfo.ReceiverName = groupInfo.groupName
  messageInfo.MessageTime = dayjs().unix()

  return messageInfo
}

export function agreeGroupMemberRequest (currentUser, user, groupInfo) {
  let messageInfo = new protobuf.InstantMessageInfo()
  messageInfo.SenderId = currentUser.oguCode
  messageInfo.SenderName = currentUser.oguName
  messageInfo.ContentType = 'Command'
  messageInfo.MessageId = 'AgreeGroupMemberRequest'
  messageInfo.ReceiverId = groupInfo.groupId
  messageInfo.ReceiverName = groupInfo.groupName
  messageInfo.ConversationId = user.oguCode
  messageInfo.ConversationName = user.oguName
  messageInfo.MessageTime = dayjs().unix()

  return messageInfo
}

export function kickGroupMemberRequest (currentUser, user, groupInfo) {
  let messageInfo = new protobuf.InstantMessageInfo()
  messageInfo.SenderId = currentUser.oguCode
  messageInfo.SenderName = currentUser.oguName
  messageInfo.ContentType = 'Command'
  messageInfo.MessageId = 'KickGroupMemberRequest'
  messageInfo.ReceiverId = groupInfo.groupId
  messageInfo.ReceiverName = groupInfo.groupName
  messageInfo.ConversationId = user.oguCode
  messageInfo.ConversationName = user.oguName
  messageInfo.MessageTime = dayjs().unix()

  return messageInfo
}

export function deleteGroupMemberRequest (currentUser, groupInfo) {
  let messageInfo = new protobuf.InstantMessageInfo()
  messageInfo.SenderId = currentUser.oguCode
  messageInfo.SenderName = currentUser.oguName
  messageInfo.ContentType = 'Command'
  messageInfo.MessageId = 'DeleteGroupMemberRequest'
  messageInfo.ReceiverId = groupInfo.groupId
  messageInfo.ReceiverName = groupInfo.groupName
  messageInfo.MessageTime = dayjs().unix()

  return messageInfo
}

export async function uploadUserAvatar (userCode, image) {
  let formData = new FormData()
  let file = { uri: image.path, type: 'multipart/form-data', name: userCode + '.png'};
  formData.append('type', 'user')
  formData.append('code', userCode)
  formData.append('file', file)

  const res = await HttpRequest.post('/uploadAvatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return res
}
