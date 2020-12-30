<template>
  <div class="aiva_home">
    <!-- Banner -->
    <section class="banner">
      <div class="container">
        <h1>欢迎来到Aiva的博客</h1>
        <h2>愿你所愿 终能实现</h2>
        <!-- <div>
          <a-button type="danger" @click="toMain">开始浏览</a-button>
        </div> -->
      </div>
    </section>

    <!-- Blog Content  -->
    <section class="aiva_main">
      <div class="container">
        <a-row>
          <a-col span="16">
            <div class="article_list" v-if="articleList.length">
              <article-info
                v-for="item in articleList"
                :key="item.aid"
                :info="item"
              />
              <div style="text-align: center">
                <a-pagination
                  show-quick-jumper
                  :default-current="1"
                  :total="this.pageInfo.total"
                  @change="changePage"
                />
              </div>
            </div>
            <div v-else>
              <p style="text-align: center; font-size: 30px">暂无数据</p>
            </div>
          </a-col>
          <a-col span="6" offset="2">
            <div class="channel_list">
              <div class="menu_item boxShadowBase">
                <p><i></i><span>我的信息</span></p>
                <div>Aiva</div>
                <div>一名前端工程师</div>
                <div>热爱技术，喜欢钻研</div>
              </div>
              <rightList
                :renderData="channelList"
                ref="channelRef"
                title="栏目列表"
                @on-change="activeItem"
              />
              <rightList
                :renderData="dateList"
                ref="dateRef"
                title="日期列表"
                @on-change="activeItemDate"
              />
              <div class="menu_item boxShadowBase">
                <p><i></i><span>标签</span></p>
                <div class="tag_box">
                  <a-tag
                    v-for="item in tagList"
                    :key="item.tagId"
                    @click="activeTag(item)"
                    :color="item.tagColor"
                    :style="{ color: item.tagFontColor }"
                    >{{ item.tagName }}</a-tag
                  >
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </section>
  </div>
</template>

<script>
import rightList from "@/components/rightList.vue";
import ArticleInfo from "@/components/ArticleInfo.vue";
export default {
  layout: "container",
  data() {
    return {
      channelList: [],
      dateList: [],
      tagList: [],
      articleList: [],
      activeChannel: "",
      activeDate: "",
      activeTagId: "",
      pageInfo: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    rightList,
    ArticleInfo,
  },
  methods: {
    changePage(page) {
      this.pageInfo.current = page;
      this.getArticle();
    },
    // 获取栏目
    getChannel() {
      this.$axios({
        url: "/channel/latest",
      }).then((res) => {
        res = res.body.data.map((item) => {
          item.id = item.cid;
          item.title = item.name;
          return item;
        });
        this.channelList = res;
      });
    },
    // 获取标签
    getTag() {
      this.$axios({
        url: "/tag/get",
      }).then((res) => {
        res = res.body.result;
        this.tagList = res;
      });
    },
    // 初始化时间
    initDate() {
      let t = new Date(new Date().setDate(1));
      t = new Date(new Date(t).setHours(0));
      t = new Date(new Date(t).setMinutes(0));
      t = new Date(new Date(t).setSeconds(0));

      let arr = [];
      let count = 5;
      for (let i = 0; i < count; i++) {
        arr.push(new Date(t).setMonth(t.getMonth() - i));
      }

      arr = arr.map((item, index) => {
        let date = new Date(item);

        let Y = date.getFullYear();
        let M = date.getMonth() + 1;
        M = M < 10 ? "0" + M : M;
        return { id: index, title: `${Y}年${M}月`, value: date };
      });

      this.dateList = arr;
    },
    // 获取文章
    getArticle() {
      this.$axios({
        url: "/article/latest",
        params: {
          channel: this.activeChannel ? this.activeChannel.cid : "",
          date: this.activeDate ? this.activeDate.value : "",
          tagId: this.activeTagId,
          page: this.pageInfo.current,
          pageSize: this.pageInfo.pageSize,
        },
      }).then((res) => {
        res = res.body;
        this.articleList = res.data;
        this.pageInfo = res.pageInfo;
        if(this.activeChannel || this.activeDate || this.activeTagId) {
          window ? window.scrollTo(0,window.innerHeight - 50) : ''
        }
      });
    },
    activeItemDate(item) {
      this.$refs.channelRef.active = "";
      this.activeTagId = "";
      this.activeDate = item;
      this.activeChannel = "";
      this.getArticle();
    },
    activeItem(item) {
      this.activeChannel = item;
      this.$refs.dateRef.active = "";

      this.activeTagId = "";
      this.activeDate = "";
      this.getArticle();
    },
    activeTag(item) {
      this.$refs.channelRef.active = "";
      this.$refs.dateRef.active = "";

      this.activeTagId = item.tagId;
      this.activeDate = "";
      this.activeChannel = "";
      this.getArticle();
    },
  },
  created() {
    this.getChannel();
    this.getTag();
    this.initDate();
    this.getArticle();
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      window.onload = () => {
        this.$nuxt.$loading.finish();
      };
    });
  },
};
</script>

<style lang="less">
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.aiva_home {
  .banner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: url("../assets/imgs/banner_bg.jpg") no-repeat 0 0 / cover;
    .container {
      padding-top: 60px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      h1,
      h2 {
        opacity: 0;
        color: #fff;
        font-weight: normal;
      }
      h1 {
        font-size: 36px;
        animation: fadeIn 2s ease forwards;
      }
      h2 {
        animation: fadeIn 2s ease 1s forwards;
        margin: 20px 0 26px 0;
        font-size: 22px;
      }
      // .ant-btn-danger {
      //   background-color: #d0344e;
      //   border-color: #d0344e;
      // }
    }
  }
  .aiva_main {
    padding-top: 100vh;
    margin-top: 60px;
    padding-bottom: 40px;
    .article_list {
    }
  }
}
.menu_item {
  & > div {
    line-height: 30px;
    &:first-of-type {
      padding-top: 10px;
    }
  }
}
.tag_box {
  & > * {
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>
