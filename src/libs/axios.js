import axios from 'axios'
import store from '@/store'
import router from '@/router/index'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //'Content-Type': 'multipart/form-data',
        // 'Authorization': localStorage.getItem('token')
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 在往后端发送请求的时候，还没有发送之前的处理，
      // 比如我们需要往我们的请求的header里面添加一些token或者其他信息的时候可以在此处进行相应的操作处理
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    })
    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      // 已经完成了和后端的交互，此处已经获取到了后端返回的请求了，
      // 可以在此处做权限的验证拦截，比如用户非法登录的时候可以在此处重定向到登录页面
      let { data } = res;
      return data;
    }, (error) => {
      //请求所有接口，出现401错误均重定向到登录页面
      // if (error.response.status == 401 || error.response.status == 1001 || error.response.status == 1004) {
      //   location.href = "/login"
      //   return error
      // }
      if (error.response.status == 1001 || error.response.status == 1004) {
        location.href = "/login"
        return error
      }
      // 对响应错误做点什么
      return Promise.reject(error);
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
