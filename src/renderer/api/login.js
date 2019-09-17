import request from '@/utils/request'
import { readFileByNode } from '@/utils/util'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    readFileByNode().then((param) => {
      const userInfo = JSON.parse(param)
      if (userInfo.loginName === username && userInfo.password === password) {
        resolve(param)
      } else {
        reject()
      }
    }).catch(() => {
      reject()
    })
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
