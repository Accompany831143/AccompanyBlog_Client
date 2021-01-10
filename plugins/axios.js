/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-10 11:45:23
 * @FilePath: \AivaBlog_Client\plugins\axios.js
 */
import ENV from "./envConst"
import {message} from 'ant-design-vue'
export default function ({ $axios, redirect }) {
  $axios.defaults.baseURL = ENV.baseUrl
  $axios.interceptors.request.use(conf => {
    if(sessionStorage.getItem('token')) {
      conf.headers.Authorization = sessionStorage.getItem('token')
    }
    conf.withCredentials = true
    return conf
  })

  $axios.interceptors.response.use(res => {
    if(res.data.stateCode === 0) {
      return res.data
    }else {
      console.log(res.data)
      message.warn(res.data.stateMessage)
    }
  },err => {
    console.log(err)
    message.error('网络错误！')
  })
}