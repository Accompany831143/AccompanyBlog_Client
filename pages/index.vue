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
            <div class="article_list">
              <article-info v-for="item in 5" :key="item" />
              <div style="text-align: center">
                <a-pagination
                  show-quick-jumper
                  :default-current="1"
                  :total="54"
                  @change="changePage"
                />
              </div>
            </div>
          </a-col>
          <a-col span="6" offset="2">
            <div class="channel_list">
              <div class="menu_item boxShadowBase">
                <p>
                  <i></i><span>我的信息</span>
                </p>
                <div>Aiva</div>
                <div>一名前端工程师</div>
                <div>热爱技术，喜欢钻研</div>
              </div>
              <rightList :renderData="channelList" title="栏目列表" />
              <rightList :renderData="dateList" title="日期列表" />
               <div class="menu_item boxShadowBase">
                <p>
                  <i></i><span>标签</span>
                </p>
                <div class="tag_box">
                  <a-tag color="blue" v-for="item in 18" :key="item">标签{{item}}</a-tag>
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
import ArticleInfo from '@/components/ArticleInfo.vue'
export default {
  layout: "container",
  data() {
    return {
      channelList: [
        {
          id: 1,
          title: "栏目1",
        },
        {
          id: 2,
          title: "栏目2",
        },
        {
          id: 3,
          title: "栏目3",
        },
        {
          id: 4,
          title: "栏目4",
        },
      ],
      dateList: [
        {
          id: 1,
          title: "2020年10月",
        },
        {
          id: 2,
          title: "2020年09月",
        },
        {
          id: 3,
          title: "2020年08月",
        },
        {
          id: 4,
          title: "2020年07月",
        },
        {
          id: 5,
          title: "2020年06月",
        },
      ],
    };
  },
  components: {
    rightList,
    ArticleInfo
  },
  methods: {
    changePage(page) {},
    // 获取栏目
    getChannel() {
      // this.$axios({
      //   url:'/api/drontEnd/getAllChannel'
      // }).then(res => {
      //   console.log(666,res)
      // })
    },
  },
  created() {
    this.getChannel();
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
  &>div {
    line-height: 30px;
    &:first-of-type {
      padding-top:10px;
    }
  }
}
.tag_box {

  &>* {
    margin-bottom:10px;
    cursor: pointer;
  }
}
</style>
