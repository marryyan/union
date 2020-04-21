//api方法封装
import axios from 'axios';
import router from '../router/index'

//设置请求超时时间
axios.defaults.timeout = 20000;

axios.interceptors.request.use(config =>  {
    config.headers.token = sessionStorage.getItem('user_token');
    // config.headers.token = '666666'
    return config
  }, (err) =>  {
      return Promise.reject(err)
  })
// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(response =>  {
  if (response.data.status == 200) {

  }else {
    if (response.data.status == 401) {
      router.replace({
        path: '/login'
      })
    }
  }
  return response;
}, (err) =>  {// 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未认证'
        break
      case 402:
        err.message = '未授权'
        break
      case 403:
        err.message = '禁用'
        break
      case 404:
        err.message = '未发现'
        break
      case 423:
        err.message = '被锁定'
        break
      case 500:
        err.response.message = '系统异常嘉豪国际和国际广告，请稍后再试'
        break
        case 504:
          err.message = '网关超时'
          break
      default:
        err.message = '网络错误'
        break
    }
  }
})
//get 方法
export function getApi(url, data) {
  return axios.get(url, {
    ...data,
    timestamp: new Date().getTime()
  }).then((res) =>  {
    return Promise.resolve(res.data)
  })
}

//post 方法
export function postApi(url, data) {
  return axios.post(url, {
    ...data,
    timestamp: new Date().getTime()
  }).then((res) =>  {
    return Promise.resolve(res.data)
  })
}
