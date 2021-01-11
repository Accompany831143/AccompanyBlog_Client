/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-11 15:46:54
 * @FilePath: \AivaBlog_Client\plugins\axios.js
 */
import ENV from "./envConst"
import { message } from 'ant-design-vue'
export default function ({ $axios, redirect }) {
  $axios.defaults.baseURL = ENV.baseUrl
  $axios.interceptors.request.use(conf => {
    try {
      conf.headers.Authorization = sessionStorage.getItem('token')
    } catch (error) {
      conf.withCredentials = true
      return conf
    }

    conf.withCredentials = true
    return conf
  })

  $axios.interceptors.response.use(res => {
    if (res.data.stateCode === 0) {
      return res.data
    } else {
      console.log(res.data)
      try {
        message.warn(res.data.stateMessage)
      } catch (error) {
        return
      }


    }
  }, err => {
    console.log(err)
    try {
      message.error('网络错误！')
    } catch (error) {
      return
    }


  })
}