<template>
  <div class="container">
    <Loadmore :top-method="loadTop" ref="loadmore" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom">
      <MySwiper />
      <div class="content">
        <ContentItem  v-for="(item, index) in contentData" :options="item" :key="index"/>
      </div>
    </Loadmore>
  </div>
</template>

<script>
import MySwiper from '@/components/my-swiper'
import { Loadmore } from 'mint-ui'
import ContentItem from './components/contentItem.vue'
import moment from 'moment'
export default {
  name: 'index',
  components: {
    MySwiper,
    ContentItem,
    Loadmore
  },
  data () {
    return {
      contentData: [],
      queryData: {
        pn: 1,
        booksSize: 2,
        size: 2
      },
      allLoaded: false
    }
  },
  methods: {
    getContent () {
      return new Promise((resolve) => {
        this.$axios.get(this.$api.getContent, {
          params: this.queryData
        }).then(res => {
          let resData = res.data
          if (resData.length <= this.queryData.size) {
            this.allLoaded = true // 加载完成
          }
          resData = resData.map(item => {
            item.books = item.books.map(it => {
              it.updataTime = moment(it.updataTime).format('YYYY年M月DD日')
              return it
            })
            return item
          })
          this.contentData = [].concat(this.contentData, resData)
          resolve()
        })
      })
    },
    loadTop () {
      this.queryData = {
        pn: 1,
        booksSize: 4,
        size: 4
      }
      this.allLoaded = false
      this.getContent().then(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadBottom () {
      this.queryData = {
        pn: this.queryData.pn++,
        booksSize: 2,
        size: 2
      }
      this.getContent().then(() => {
        this.$refs.loadmore.onBottomLoaded()
      })
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style scoped lang='scss'>
@import '../../globalCss/ps2-rem';
.container {
  padding: px-to-rem(18);
  padding-bottom: 60px;
}
</style>
