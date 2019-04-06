<template>
  <div class="container login register">
    <div class="logo">
      <i class="iconfont icon-shuji"></i>
    </div>
    <div class="input-wrap">
      <song-input v-model="formData.phone" placeholder="请输入你的手机号">
        <i class="iconfont icon-shouji-" slot="icon"></i>
      </song-input>
      <song-input v-model="formData.password" placeholder="请输入你的密码" :type="type">
        <i class="iconfont icon-biyan" slot="icon" @click="toggleType" :class="{'icon-yanke': type === 'text'}"></i>
      </song-input>
      <song-input :max="6" type="tel" v-model="formData.code" placeholder="请输入验证码">
        <i class="iconfont icon-yanzhengma" slot="icon"></i>
         <Button size="small" slot="right" @click="sendCode">{{btnText}}</Button>
      </song-input>
    </div>
    <div class="router-wrap">
      <router-link to="/login">
        已有账号? 立即登录
      </router-link>
    </div>
    <Button type="primary" @click="handleRegister" size="large" style="margin-top: 30px">立即注册</Button>
  </div>
</template>

<script>
import songInput from '@/components/dy-input'
import {Button, Toast} from 'mint-ui'
import validator from 'validator'
export default {
  name: 'index',
  components: {
    songInput,
    Button
  },
  data () {
    return {
      formData: {
        phone: '',
        password: '',
        code: ''
      },
      type: 'password',
      btnText: '获取验证码',
      isSendCode: false
    }
  },
  methods: {
    toggleType () {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    sendCode () {
      if (validator.isMobilePhone(this.formData.phone, 'zh-CN')) {
        this.isSendCode = true
        let seconds = 10
        let time = setInterval(() => {
          seconds--
          this.btnText = `${seconds}s后再次获取`
          if (seconds === 0) {
            clearInterval(time)
            this.btnText = '重新获取验证码'
          }
        }, 1000)
        this.$axios.post(this.$api.sendCode, {phone: this.formData.phone}).then((res) => {
          Toast({
            message: res.msg,
            duration: 500
          })
        })
      } else {
        Toast({
          message: '手机号不合法',
          duration: 500
        })
      }
    },
    handleRegister () {
      let pohoneStauts = validator.isMobilePhone(this.formData.phone, 'zh-CN')
      let passwordStatus = validator.isLength(this.formData.password, {min: 6})
      if (pohoneStauts && passwordStatus && this.isSendCode) {
        this.$axios.post(this.$api.register, this.formData).then(res => {
          if (res.code === 200) {
            Toast({
              message: res.msg,
              duration: 1000
            })
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          } else {
            Toast({
              message: res.msg,
              duration: 1000
            })
          }
        })
      } else {
        Toast({
          message: '请确保手机号正确',
          duration: 1000
        })
      }
    }
  }
}
</script>

<style scoped lang="scss" src="../login/index.scss"></style>
