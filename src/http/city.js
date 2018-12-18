import Fly from 'flyio/dist/npm/wx'
// import toPairs from 'lodash/toPairs'
import { FLY_CONFIG } from '@/config'
import qs from 'qs'
import md5 from 'md5'
import url from 'url'

// import { FLY_CONFIG } from '@/config'
const fly = new Fly()
// const _ = new Lodash()

fly.config.timeout = 20000
// // 添加请求拦截器
fly.interceptors.request.use(request => {
  // 给所有请求添加自定义header
  //   request.headers['X-Tag'] = 'flyio'
  // 打印出请求体
  // console.log(request.body)
  // 终止请求
  // var err=new Error("xxx")
  // err.request=request
  // return Promise.reject(new Error(""))

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  request.body.key = FLY_CONFIG.TENCENT_MAPS_JS_API_KEY
  let params = request.body
  let ksort = qs.stringify(params, {
    addQueryPrefix: true,
    sort: (a, b) => {
      return a.localeCompare(b)
    }
  })
  console.log(
    url.parse(request.url).pathname + ksort + FLY_CONFIG.TENCENT_MAPS_SECRET_KEY
  )
  let sig = md5(
    url.parse(request.url).pathname + ksort + FLY_CONFIG.TENCENT_MAPS_SECRET_KEY
  )
  request.body.sig = sig
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    // 只将请求结果的data字段返回
    return response.data
  },
  err => {
    console.log(err)
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
  }
)
export default {
  getCityByName: cityName => {
    return fly.get('https://apis.map.qq.com/ws/geocoder/v1', {
      location: 'dsad'
    })
  },
  getCityByGPS: (lat, lng) => {
    return fly.get('https://apis.map.qq.com/ws/geocoder/v1', {
      location: lat + ',' + lng
    })
  }
}
