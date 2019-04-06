<template>
   <div class="person">
     <div class="top-wrap">
       <router-link :to="{name: 'login'}" v-if="!userMsg.user" class="login-box">
         <div class="left">
           <h2>立即登录</h2>
           <div class="desc">
             时光回头，当下最重要
           </div>
         </div>
         <div class="right">
           <img src='@/assets/awtia.jpg' alt="" class="avatar">
           <i class="iconfont icon-xiayige"></i>
         </div>
       </router-link> <!--login-box end-->
       <div class="user-box login-box" v-else>
         <div class="left">
           <h2>{{userMsg.user.username || userMsg.user.phone}}</h2>
           <div class="desc">
             {{userMsg.user.desc || '该用户很赖还没有写个性签名'}}
           </div>
         </div>
         <div class="right">
           <img :src="userMsg.user.avatar || JPG" alt="" class="avatar">
           <i class="iconfont icon-xiayige"></i>
         </div>
       </div>
       <div class="collection-data">
           <div class="collection-item">
             <div class="title">
              {{userMsg.read}}
               <span class="little-title">本</span>
             </div>
             <div class="desc">已读书籍</div>
           </div>
           <div class="collection-item">
             <div class="title">
               {{userMsg.collection}}
               <span class="little-title">本</span>
             </div>
             <div class="desc">已收藏书籍</div>
           </div>
           <div class="collection-item">
             <div class="title">
               {{userMsg.like}}
               <span class="little-title">本</span>
             </div>
             <div class="desc">喜欢</div>
            </div>
           <i class="col-line"></i>
           <i class="col-line"></i>
       </div> <!--collection-data-end-->
     </div><!--top-wrap-end-->
     <div class="menu">
       <router-link to="#" class="menu-item">
         <div class="menu-item-left">
           <i class="iconfont icon-xiugaixinxi"></i>
           <span class="menu-item-text">修改个人信息</span>
         </div>
           <i class="iconfont icon-xiayige"></i>
       </router-link>
       <router-link to="#" class="menu-item">
         <div class="menu-item-left">
           <i class="iconfont icon-huaban"></i>
           <span class="menu-item-text">收藏书单</span>
         </div>
         <i class="iconfont icon-xiayige"></i>
       </router-link>
       <router-link to="#" class="menu-item">
         <div class="menu-item-left">
           <i class="iconfont icon-xihuan"></i>
           <span class="menu-item-text">喜欢的书籍</span>
         </div>
         <i class="iconfont icon-xiayige"></i>
       </router-link>
     </div>
   </div>
</template>

<script>
import JPG from '@/assets/awtia.jpg'
export default {
  name: 'person',
  data () {
    return {
      JPG
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('getUserMsg')
    }
  },
  computed: {
    userMsg () {
      return this.$store.state.userMsg
    }
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
