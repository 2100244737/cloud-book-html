<template>
  <div class="dy-input-wrap">
    <slot name="icon">
      <i class="iconfont icon-ren"></i>
    </slot>
    <label>
      <input type="text" v-model="currentValue" v-if="type == 'text'" :placeholder="placeholder">
      <input type="password" v-model="currentValue" v-else :placeholder="placeholder">
    </label>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    value: [String, Number],
    type: {
      default: 'text'
    },
    placeholder: String,
    max: Number
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue (newValue, oldValue) {
      if (this.max) {
        if (newValue.length > this.max) {
          this.currentValue = oldValue
        }
      }
      this.$emit('input', newValue)
    },
    value: {
      immediate: true,
      handler (val) {
        this.currentValue = val
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
