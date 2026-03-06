import axios from '@/libs/api.request'
import qs from "qs"

export const login = ({ username, password, grant_type, client_id, scope, client_secret,qiyeID,vcode,logintype }) => {
  const data = {
    username, password, grant_type, client_id, scope, client_secret,qiyeID,vcode,logintype
  }
  return axios.request({
    url: 'xwcloud-oauth/staff/login',
    data: qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'xwcloud-sys/sys/StaffManagement/GetLoginUserInfo',
    headers: {
      'Authorization': "Bearer " + token
    },
    method: 'get',
  })
}



export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}


