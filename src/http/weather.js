import fly from './config'

export default {
  getWeather: cityName => {
    return fly.get('http://wthrcdn.etouch.cn/weather_mini', {
      city: cityName
    })
  }
}
