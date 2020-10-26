<template>
  <div>
    <h2>分人主義の落書き</h2>
    <p>1人の人間は，複数の分人のネットワークであり，そこには「本当の自分」という中身はない</p>
    <input ref="input" :value="title" placeholder="keyup.enter" @keyup.capture="trigger">

    <div>
      <p>{{ title }}</p>
      <v-card color="basil">
        <v-card-title class="text-center justify-center py-6">
          <h2 class="font-weight-bold display-3 basil--text">
            分人主義の落書き
          </h2>
        </v-card-title>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-card
              color="basil"
              flat
            >
              <p>{{ item }}</p>
              <v-card-text>{{ texts[i] }}</v-card-text>
              <input :ref="item" :value="texts[i]" placeholder="keyup.enter" @keyup.capture="trigger">
              <v-container fluid>
                <!-- <v-textarea
                  ref="input-text"
                  name="input"
                  filled
                  label="Label"
                  auto-grow
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                /> -->
              </v-container>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>

    <!-- <p>{{ interval.toFixed(2) }}</p> 小数2桁まで表示 -->
    <button v-show="!active" @click="startTimer()">
      Start
    </button>
    <button v-show="active" @click="stopTimer()">
      Stop
    </button>
    <button @click="resetTimer()">
      Reset
    </button>

    <div v-for="(t, n) in titleDiff" :key="n">
      <p>{{ t }} : {{ intervalDiff[n] }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  title: string
  body: string,
  active: boolean,
  start: number,
  timer: number,
  interval: number,
  accum: number,
  titleDiff: string[],
  intervalDiff: string[],
  tab: number | null,
  items: string[],
  texts: string[],
  badText: string,
  goodText: string,
  weirdText: string
}

export default Vue.extend({
  data (): DataType {
    return {
      // インプット
      title: '',
      body: '',
      // タイマー
      active: false,
      start: 0,
      timer: 0,
      interval: 0,
      accum: 0,

      // ストレージ
      titleDiff: [],
      intervalDiff: [],

      // vuetify
      tab: null,
      items: ['badguy', 'goodguy', 'weirdguy'],
      texts: ['a', 'b', 'c'],
      badText: '',
      goodText: '',
      weirdText: ''
    }
  },
  watch: {
    title () {
      console.log(this.title)
      console.log(this.interval.toFixed(2))
      this.titleDiff.push(this.title)
      this.intervalDiff.push(this.interval.toFixed(2))
    }
  },
  mounted () {
    this.$nextTick(() => {
      const $input = (this as any).$refs.input
      console.log($input)
      $input.addEventListener('keyup', this.update)
      $input.addEventListener('compositionend', this.update)
    })
  },
  methods: {
    trigger (event: any) {
      if (event.keyCode !== 13) { }

      // 実行したい処理
      // console.log(event.keyCode)
      // console.log(this.title)
      // console.log(this.body)
    },
    update (e: any) {
      this.$nextTick(() => {
        this.title = e.target.value
      })
    },

    // タイマー
    startTimer () {
      this.active = true
      this.start = Date.now()
      this.timer = window.setInterval(() => { this.interval = this.accum + (Date.now() - this.start) * 0.001 }, 10) // 10msごとに現在時刻とstartを押した時刻の差を足す
    },
    stopTimer () {
      this.active = false
      this.accum = this.interval
      clearInterval(this.timer)
    },
    resetTimer () {
      this.interval = 0
      this.accum = 0
      this.start = Date.now()
    }
  }
})
</script>

<style scoped lang="scss">
</style>
