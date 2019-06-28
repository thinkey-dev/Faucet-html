import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://' + window.location.host+'/v1/wallet/',
  // baseURL: 'http://192.168.1.164:8201/v1/wallet/',
  baseURL: 'http://publicchain.thinkey.xyz/v1/wallet/',
  timeout: 200000 // 请求超时时间
})
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
    // if (response.eCode === undefined ) {
    //   return response.data
    // } else {
    //   return Promise.reject('error')
    // }
  },
  error => {
    console.log('err' + error) // for debug
    let msg = ''
    if (error == 'Error: timeout of 200000ms exceeded') {
      msg = '无效请求！请求超时！'
    } else {
      msg = error.message
    }
    Message({
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
