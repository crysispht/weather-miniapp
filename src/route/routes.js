module.exports = {
  pages: [
    {
      path: 'pages/weather/index',
      config: {
        navigationBarTitleText: '微天气',
        usingComponents: {
          'van-dialog': '/static/vant-weapp/dist/dialog/index'
        }
      }
    },
    'pages/index/index',
    'pages/counter/counter'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '微天气',
    navigationBarTextStyle: 'black'
  }
}
