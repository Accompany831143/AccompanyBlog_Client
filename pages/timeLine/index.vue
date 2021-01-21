<!--
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-21 10:51:21
 * @FilePath: \AivaBlog_Client\pages\timeLine\index.vue
-->
<template>
  <div class="timeLine">
    <div class="container">
      <a-timeline mode="left" reverse v-if="articleList.length">
        <a-timeline-item
          color="#d0344e"
          v-for="(item) in articleList"
          :key="item._id"
        >
          <div class="timeLineBox">
            <a-tag class="dateTag" color="green">{{item.releaseTime}}</a-tag>
            <article-info :info="item" />
          </div>
        </a-timeline-item>
      </a-timeline>
      <a-empty v-else />
      <div style="text-align:right;" v-show="articleList.length">
        <p class="loadMore" @click="addMore" v-if="hasMore">加载更多</p>
        <p class="loadMore" v-else >没有数据啦</p>
      </div>
      
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
      },
      hasMore:true
    };
  },
  components: {
    ArticleInfo,
  },
  methods:{
    // 获取文章
    getArticle() {
      this.$axios({
        url:'/article/latest',
        params:{
          page:this.pageInfo.current,
          pageSize:this.pageInfo.pageSize
        }
      }).then(res => {
        res = res.body
        res.data = res.data.map(item => {
          item.releaseTime = Moment(item.releaseTime).format('YYYY年MM月DD日 HH:mm:ss')
          return item
        })
        this.articleList = this.articleList.concat(res.data)
        this.articleList = this.articleList.reverse()
        this.pageInfo = res.pageInfo
        if(res.data.length <= 0) {
          this.hasMore = false
        }
      })
    },
    addMore() {
      this.pageInfo.current = this.pageInfo.current + 1;
      this.getArticle()
    }
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
  padding-top: 115px;
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
.loadMore {
  display: inline-block;
  width:700px;
  margin:-50px 0 50px;
  padding:10px 0;
  text-align:center;
  cursor: pointer;
  background-color: #fff;
  border-radius:5px;
}
</style>