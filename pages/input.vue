<template>
  <div>
    <h2>TOP PAGE</h2>
    <p>{{ title }}</p>
    <input ref="input" :value="title" placeholder="keyup.enter" @keyup.capture="trigger">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  title: string
  body: string
}

export default Vue.extend({
  data (): DataType {
    return {
      title: '',
      body: ''
    }
  },
  watch: {
    title () {
      console.log(this.title)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const $input = (this as any).$refs.input
      $input.addEventListener('keyup', this.update)
      $input.addEventListener('compositionend', this.update)
    })
  },
  methods: {
    trigger (event: any) {
      if (event.keyCode !== 13) { return }

      // 実行したい処理
      console.log(event.keyCode)
      console.log(this.title)
      console.log(this.body)
    },
    update (e: any) {
      this.title = e.target.value
    }
  }
})
</script>

<style scoped lang="scss">
</style>
