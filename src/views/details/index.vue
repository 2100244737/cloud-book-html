<template>
  <div class="container">
   <div class="book">
      <div class="book-left">
        <img :src="bookData.img" :alt="bookData.img" class="img">
      </div>
      <div class="book-right">
        <h2 class="title">{{bookData.title}}</h2>
         <div class="book-msg">
           <div class="author">
             作者:{{bookData.author}}
           </div>
           <div class="looksnums">
             {{bookData.looknums}}在看
           </div>
           <div class="like">
             {{bookData.startsnums}}人喜欢
           </div>
         </div>
      </div>
   </div>
    <div class="btns">
      <Button size="small">加入收藏</Button>
      <Button size="small">分享好友</Button>
    </div>
    <div class="line"></div>
    <div class="book-title">{{bookData.title}}</div>
    <div class="book-desc">{{bookData.desc}}</div>
    <div class="show-titles">
      <h2 class="title">查看目录
      <span>共{{totalTitles}}章</span>
      </h2>
      <div class="date">{{bookData.updateTime}}</div>
    </div>
    <div class="line"></div>
    <div class="read-btn">
      <Button type="primary" size="large" @click="handleJump">阅读该书籍</Button>
    </div>
  </div>
</template>

<script>
import {Button} from 'mint-ui'
import moment from 'moment'
export default {
  name: 'dy-details',
  components: {
    Button
  },
  data () {
    return {
      bookData: [],
      totalTitles: 0
    }
  },
  methods: {
    getBookData () {
      const id = this.$route.params.id
      this.$axios.get(this.$api.getBook + id).then((res) => {
        let resData = res.data
        resData.updateTime = moment(resData.updateTime).format('YYYY年M月D日')
        this.bookData = resData
        this.totalTitles = res.length
      })
    },
    handleJump () {
      this.$router.push({
        name: 'titles',
        params: {
          id: this.bookData._id
        }
      })
    }
  },
  created () {
    this.getBookData()
  }
}
</script>

<style scoped lang="scss">
  @import '../../globalCss/ps2-rem';
.book {
  display: flex;
  justify-content: space-between;
  .book-left {
    width: px-to-rem(200);
    height: px-to-rem(266);
    box-shadow: 0 0 2px 2px rgba(0,0,0, .5);
    .img {
      height: 100%;
      width: 100%;
    }
  }
  .book-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex:1;
    margin-left: 10px;
    .title {
      font-size: 16px;;
      font-weight: 500;
    }
    .book-msg {
      flex: 1;
      padding-top: 26px;
      margin-left: 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
     color:#555;
      font-size: 12px;
    }
  }
}
  .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  /deep/ .mint-button-text {
    font-size: 12px;
    color: #555;
  }
  .mint-button {
    width: 100px;
    height: 26px;
  }
  .line {
    height: 6px;
    background: #e0e0e0;
    margin-top: 20px;
  }
  .book-title {
    margin-top: 20px;
    font-weight: 700;
    font-size: 16px;
    color: #333;
  }
  .book-desc {
    margin-top: 16px;
    font-size: 12px;
    line-height: 2;
    color:#333;
  }
  .show-titles {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #333;
      span {
        font-size: 12px;
        margin-left: 20px;
      }
    }
    .data {
      font-size: 12px;
      color: #555;
    }
  }
  .read-btn {
    margin-top: 30px;

    /deep/ .mint-button-text {
      font-size: 12px;
    }
    /deep/ .mint-button {
      height: 26px;
      width: 100%;
      opacity:.7;
    }
  }
</style>
