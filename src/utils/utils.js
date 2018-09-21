// 工具函数
import config from '../config/config'

// http 请求工具函数
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: res => {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          showModal('添加失败', res.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function outsideReq (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: url,
      success: res => {
        resolve(res.data)
      },
      fail: res => {
        reject(res.data)
      }
    })
  })
}

export function showModal (title, content) {
  wx.showModal({ title, content, showCancel: false })
}
