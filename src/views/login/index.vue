<template>
  <div class="container login">
    <div class="logo">
      <i class="iconfont icon-shuji"></i>
    </div>
    <div class="input-wrap">
      <song-input v-model="formData.phone" placeholder="请输入你的手机号"></song-input>
      <song-input v-model="formData.password" placeholder="请输入你的密码" :type="type">
        <i class="iconfont icon-biyan" slot="icon" @click="toggleType" :class="{'icon-yanke': type === 'text'}"></i>
      </song-input>
    </div>
    <div class="router-wrap">
      <router-link to="/register">
        没有账号? 立即注册
      </router-link>
    </div>
    <Button type="primary" @click="handleLogin" size="large" style="margin-top: 30px">立即登录</Button>
  </div>
</template>

<script>
import songInput from '@/components/dy-input'
import {Button, Toast} from 'mint-ui'
import validator from 'validator'
export default {
  name: 'login',
  components: {
    songInput,
    Button
  },
  data () {
    return {
      formData: {
        phone: '',
        password: ''
      },
      type: 'password'
    }
  },
  methods: {
    toggleType () {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    handleLogin () {
      let pohoneStauts = validator.isMobilePhone(this.formData.phone, 'zh-CN')
      let passwordStatus = validator.isLength(this.formData.password, {min: 6})
      if (passwordStatus && pohoneStauts) {
        this.$axios.post(this.$api.login, this.formData).then(res => {
          if (res.code === 200) {
            let token = res.token
            localStorage.setItem('token', token)
            Toast({
              message: '登录成功'
            })
            setTimeout(() => {
              this.$router.push({
                name: 'person'
              })
            }, 800)
          } else {
            Toast({
              message: res.msg
            })
          }
        })
      } else {
        Toast({
          message: '手机号不合法或者密码不正确',
          duration: 1000
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
  .login {
    margin-top: 20px;
  }
</style>
