<template>
  <div class="content">
    <!-- 显示当前天气 -->
    <div class="info">
      <div class="city">{{ cityName }} {{ today }}</div>
      <div class="temp">{{ weather.wendu }}℃</div>
      <div class="weather">{{ weather.ganmao }}</div>
    </div>
    <!-- 昨天的天气信息 -->
    <div class="yesterday">
      <div class="detail">
        <text class="yesterday-title">昨天</text>
        {{ weather.yesterday.fx }}
        {{ weather.yesterday.fl }}
        {{ weather.yesterday.low }}
        {{ weather.yesterday.high }}
      </div>
    </div>

    <!-- 最近5天信息 -->
    <div class="forecast">
      <div class="next-day" v-for="(item,index) in weather.forecast" :key="index">
        <div class="detail date">{{ item.date }}</div>
        <div class="detail">{{ item.type }}</div>
        <div class="detail">{{ item.high }}</div>
        <div class="detail">{{ item.low }}</div>
        <div class="detail">{{ item.fengxiang }}</div>
        <div class="detail">{{ item.fengli }}</div>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="search-area">
      <input type="text" placeholder="请输入城市名称" v-model.lazy="inputCity">
      <button type="primary" size="mini" @tap="loadCity(inputCity)">查询</button>
      <div size="mini">{{ inputCity }}</div>
    </div>
    <van-dialog
      @close="onClose"
      :show="showWxSetting"
      show-cancel-button
      confirm-button-open-type="openSetting"
      message="请授权访问地理位置"
      @opensetting="closeAuth"
    ></van-dialog>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { formatTime } from '@/utils/index'
// let promisify = require('../../utils/promisify.js')
import promisify from '../../utils/promisify.js'
// import Dialog from '@static/vant-weapp/dist/dialog/dialog'
const getSetting = promisify(wx.getSetting)

export default {
  data () {
    return {
      today: formatTime(new Date()),
      inputCity: '',
      showWxSetting: false
    }
  },
  computed: {
    cityName () {
      return this.getCity.district
    },
    ...mapGetters('weather',
      { weather: 'getWeather' }
    ),
    ...mapGetters('city', [
      'getCity'
    ])
  },
  methods: {
    onClose (event) {
      if (event.mp.detail === 'cancel') {
        // 异步关闭弹窗
        setTimeout(() => {
          this.showWxSetting = false
        }, 1000)
      } else {
        this.showWxSetting = true
      }
    },
    closeAuth (event) {
      this.showWxSetting = false
      if (event.mp.detail.authSetting['scope.userLocation'] !== false) {
        this.loadCity()
      }
    },
    ...mapActions('weather', [
      'loadWeather'
    ]),
    ...mapActions('city', [
      'loadCity'
    ])
  },
  created () {
    getSetting().then(res => {
      if (res.authSetting['scope.userLocation'] === false) {
        this.showWxSetting = true
      } else if (this.$_.isEmpty(this.getCity)) {
        this.loadCity()
      }
    }).catch(err => {
      console.log(err)
    })

    if (this.$_.isEmpty(this.weather)) {
      this.loadWeather(this.cityName)
    }
  },
  onPullDownRefresh () {
    this.loadCity()
    this.loadWeather(this.cityName)
  }
}
</script>

<style lang="scss">
.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: '微软雅黑', '宋体';
  box-sizing: border-box;
  padding: 20rpx 10rpx;
  color: #252525;
  font-size: 16px;
  background-color: #f2f2f8;
}

.info {
  margin-top: 50rpx;
  width: 100%;
  height: 160px;
}

.city {
  margin: 20rpx;
  border-bottom: 1px solid #043567;
}

.temp {
  font-size: 120rpx;
  line-height: 130rpx;
  text-align: center;
  padding-top: 20rpx;
  color: #043567;
}

.weather {
  line-height: 22px;
  margin: 10px 0;
  padding: 0 10px;
}

.yesterday {
  width: 93%;
  padding: 20rpx;
  margin-top: 50rpx;
  border-radius: 10rpx;
  border: 1px solid #043567;
}

.yesterday-title {
  color: red;
}

.forecast {
  width: 100%;
  display: flex;
  margin-top: 50rpx;
  align-self: flex-end;
}

.next-day {
  width: 20%;
  height: 450rpx;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  margin: 0 3rpx;
  border: 1px solid #043567;
  border-radius: 10rpx;
}

.date {
  line-height: 30px;
  margin-bottom: 20rpx;
  border-bottom: 1px solid #043567;
  color: #f29f39;
}

.search-area {
  display: flex;
  background: #f4f4f4;
  padding: 1rem 0.5rem;

  input {
    width: 70%;
    height: 38px;
    line-height: 38px;
    border: 1px solid #cccccc;
    box-shadow: inset 0 0 10px #cccccc;
    color: #000000;
    background-color: #ffffff;
    border-radius: 5px;
  }

  button {
    width: 30%;
    height: 40px;
    line-height: 40px;
    margin-left: 5px;
  }
}
</style>
