import fly from './config'
import { FLY_CONFIG } from '@/config'

// fly.interceptors.request.use(request => {
//   return request
// })

export default {
  getCity: cityName => {
    return fly.get('https://apis.map.qq.com/ws/geocoder/v1', {
      location: 'dsad',
      key: FLY_CONFIG.TENCENT_MAPS_JS_API_KEY
    })
  }
}
