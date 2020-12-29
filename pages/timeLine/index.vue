<!--
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2020-12-29 09:37:34
 * @FilePath: \AivaBlog_Client\pages\timeLine\index.vue
-->
<template>
  <div class="timeLine">
    <div class="container">
      <a-timeline mode="left" reverse>
        <a-timeline-item
          color="#d0344e"
          v-for="(item) in articleList"
          :key="item.articleId"
        >
          <div class="timeLineBox">
            <a-tag class="dateTag" color="green">{{item.releaseTime}}</a-tag>
            <article-info :info="item" />
          </div>
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script>
import ArticleInfo from "@/components/ArticleInfo.vue";
import Moment from "moment"
export default {
  layout: "container",
  data() {
    return {
      articleList:[],
      pageInfo:{
        current:1,
        total:0,
        pageSize:5
      }
    };
  },
  components: {
    ArticleInfo,
  },
  methods:{
    // 获取文章
    getArticle(channel='',date='') {
      this.$axios({
        url:'/article/latest',
        params:{
          channel,
          date,
          page:this.pageInfo.current,
          pageSize:this.pageInfo.pageSize
        }
      }).then(res => {
        res = res.body
        res.data = res.data.map(item => {
          item.releaseTime = Moment(item.releaseTime).format('YYYY年MM月DD日 HH:mm:ss')
          return item
        })
        this.articleList = res.data
        this.pageInfo = res.pageInfo
      })
    },
  },
  head(){
    return{
      title: '时间轴 - Aiva博客',
      meta:[
        { hid: 'description', name: 'description', content:'Aiva博客的时间轴'}
      ]
    }
  },
  created() {
    this.getArticle()
  }
};
</script>

<style lang='less' scoped>
.timeLine {
  // background-color: #fff;
  padding-top: 100px;
  min-height: calc(100vh - 40px);
  .container {
    width: 740px;
  }
  .timeLineBox {
    width: 700px;
    margin-left:20px;
    .dateTag {
      margin-bottom:20px;
    }
  }
}
</style>