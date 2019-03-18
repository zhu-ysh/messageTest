import configData from '../../app.json'
import request from '../utilities/HttpRequest'

export const logon = async (logonInfo) => {
  const result = await request.post(`/logon`, logonInfo)
  
  return result
}

export const getUserGroupList = async (userCode) => {
  const result = await request.get(`/getUserGroupList?userCode=${userCode}`)

  return result
}


export const getDeptList = async () => {
  const result = await request.get(`/getDeptList`)

  return result
}

export const getUser = async (userCode) => {
  const result = await request.get(`/getUser?userCode=${userCode}`)

  return result
}

export const getUserList = async () => {
  const result = await request.get(`/getUserList`)

  return result
}


export const getInitUserData = async (userCode) => {
  const result = await request.get(`/getInitUserData?userCode=${userCode}`)

  return result
}

export const uploadFile = async (fileName, fileData) => {
  let formData = new FormData()
  formData.append(fileName, fileData)

  const filePath = await service.post('/uploadFile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return filePath
}

export const getDownloadFileUrl = (messageId, thumb) => {
  return `${configData.remoteUrl}${contextPath}/downloadFile?messageId=${messageId}&thumb=${thumb}`
}
