import ENV from "./envConst"
export default function ({ $axios, redirect }) {
  // $axios.onRequest(config => {
  //   console.log('Making request to ' + config.url)
  // })

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
  $axios.defaults.baseURL = ENV.baseUrl
  $axios.interceptors.request.use(conf => {
    if(JSON.parse(sessionStorage.getItem('userInfo')) && JSON.parse(sessionStorage.getItem('userInfo')).token) {
      conf.headers.Authorization = JSON.parse(sessionStorage.getItem('userInfo')).token
    }
    // if(ENV === 'development') {
      conf.withCredentials = true
    // }
    return conf
  })

  $axios.interceptors.response.use(res => {
    if(res.data.stateCode === 0) {
      return res.data
    }else {
      console.log(res.data)
      window.alert(res.data.stateMessage)
    }
  },err => {
    console.log(err)
    window.alert('网络错误！')
  })
}