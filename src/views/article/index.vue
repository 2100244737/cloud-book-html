<template>
   <div class="container">
     <div class="content markdown" v-html="html" :style="{fontSize:fontSize + 'px'}"></div>
     <div class="btns">
       <i class="iconfont icon-houtuishangyige" @click="handleJump('prev')"></i>
       <i class="iconfont icon-Category"  @click="showTitles"></i>
       <i class="iconfont icon-zitifangda" @click="handleAdd"></i>
       <i class="iconfont icon-zitisuoxiao" @click="handleReduce"></i>
       <i class="iconfont icon-xiayige" @click="handleJump('next')"></i>
     </div>
     <div class="title-wrap" v-show="isShowTitles" @click="hideTitles">
         <transition name="slide">
           <ul class="titles" v-show="isActive" @click.stop>
             <li v-for="(item, index) in titles" :key="index" class="title-item">
               {{item.title}}
             </li>
           </ul>
         </transition>
     </div>
   </div>
</template>

<script>
import Showdown from 'showdown'
import {Toast} from 'mint-ui'
export default {
  name: 'dy-article',
  data () {
    return {
      article: {},
      html: ``,
      fontSize: 48,
      titles: [],
      index: -1,
      isShowTitles: false,
      isActive: false
    }
  },
  methods: {
    getArticle (itemId) {
      return new Promise((resolve) => {
        const id = itemId || this.$route.params.id
        this.$axios.get(this.$api.getArticle + id).then((res) => {
          const coverter = new Showdown.Converter()
          this.html = coverter.makeHtml(res.data.article.content)
          this.article = res.data
          this.index = res.data.article.index
          resolve()
        })
      })
    },
    handleAdd () {
      if (this.fontSize >= 68) {
        Toast({
          message: '字体过大会失真!!!!',
          position: 'bottom',
          duration: 2000
        })
      } else {
        this.fontSize += 2
      }
    },
    handleReduce () {
      if (this.fontSize <= 42) {
        Toast({
          message: '字体太小会损害眼睛o~~~',
          position: 'bottom',
          duration: 2000
        })
      } else {
        this.fontSize -= 2
      }
    },
    getTitles () {
      const id = this.article.article.bookId
      this.$axios.get(this.$api.getTitles + id).then((res) => {
        this.titles = res.data
      })
    },
    handleJump (isPrev) {
      const _this = this
      function getArticleById () {
        const item = _this.titles.find(item => item.index === _this.index)
        const id = item._id
        _this.getArticle(id)
        _this.$router.push({
          name: 'article',
          params: {
            id
          }
        })
      }
      if (isPrev === 'prev') {
        if (this.index === 0) {
          Toast({
            message: '已到第一章',
            position: 'bottom',
            duration: 2000
          })
        } else {
          this.index--
          getArticleById()
        }
      } else {
        if (this.index === this.titles.length - 1) {
          Toast({
            message: '已到最后一章',
            position: 'bottom',
            duration: 2000
          })
        } else {
          this.index++
          getArticleById()
        }
      }
    },
    showTitles () {
      this.isShowTitles = true
      this.isActive = true
    },
    hideTitles () {
      this.isActive = false
      setTimeout(() => {
        this.isShowTitles = false
      }, 500)
    }
  },
  created () {
    this.getArticle().then(() => {
      this.getTitles()
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../globalCss/ps2-rem';
.btns {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
   .iconfont {
     flex:1;
     text-align: center;
     color: #333;
     font-size: 24px;
     height: 42px;
     line-height: 42px;
   }
}
  .title-wrap {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);

    .titles {
      position: absolute;
      top: 0;
      bottom: 0;
      background: #fff;
      color: #000;
      width: 70%;
      height: 100%;
    }
    .title-item {
      padding: 10px;
      border-bottom: 2px solid #eee;
    }
     .slide-enter, .slide-leave-to {
       transform: translate3d(-100%,0,0);
     }
    .slide-enter-active, .slide-leave-active {
      transition: transform ease 1s;
    }
  }
</style>
<style lang="scss">
  @import './markdown.scss';
</style>
