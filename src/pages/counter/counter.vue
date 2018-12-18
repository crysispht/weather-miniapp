<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="test">test</button>
    </p>

    <a href="/pages/index/index" class="home">去往首页</a>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  config: {
    navigationBarTitleText: 'Vuex示例'
  },

  computed: {
    ...mapGetters('counter', {
      count: 'getCount'
    })
  },

  methods: {
    ...mapMutations('counter', [
      'increment',
      'decrement'
    ]),
    test () {
      console.log(this)
      console.log(this.count)
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
