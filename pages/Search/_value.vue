<template>
  <div class="aiva_home">
    <!-- Blog Content  -->
    <section class="aiva_main">
      <div class="container">
        <p class="search_title">
          <span>搜索到包含</span>
          <span class="primaryColor">{{ keyWord }}</span>
          <span
            >的结果共 <b>{{ 50 }}</b> 条</span
          >
        </p>
        <a-row>
          <a-col span="16">
            <div class="article_list">
              <div
                class="article_item"
                v-for="item in [1, 2, 3, 4, 5, 6]"
                :key="item"
              >
                <div class="img_box">
                  <nuxt-link :to="'/article/' + item">
                    <img src="../../assets/imgs/banner_bg.jpg" alt="" />
                  </nuxt-link>
                </div>
                <div class="article_info">
                  <a-tooltip>
                    <template slot="title"
                      >htmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtml</template
                    >
                    <a-tag color="#d0344e" class="channel_tag"
                      >htmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtml</a-tag
                    >
                  </a-tooltip>

                  <div>
                    <a-icon type="eye" style="color: #999" />
                    <span style="color: #999">65</span>
                  </div>
                  <div>
                    <a-icon type="like" style="color: #999" />
                    <span style="color: #999">32</span>
                  </div>
                  <div>
                    <a-icon type="heart" style="color: #999" />
                    <span style="color: #999">13</span>
                  </div>
                </div>
                <h2>
                  <nuxt-link class="linkColor" :to="'/article/' + item"
                    >webpack配置babel</nuxt-link
                  >
                </h2>
                <div class="article_description">
                  babel是一个javascript编译器，是前端开发中的一个利器。它突破了浏览器实现es标准的限制，使我们在开发中可以使用最新的javascript语法。
                  通过构建和babel，可以使用最新js语法进行开发，最后自动编译成用于浏览器或node环境的代码。
                  babel是一个javascript编译器，是前端开发中的一个利器。它突破了浏览器实现es标准的限制，使我们在开发中可以使用最新的javascript语法。
                  通过构建和babel，可以使用最新js语法进行开发，最后自动编译成用于浏览器或node环境的代码。
                </div>
                <a-button type="primary" ghost>查看文章</a-button>
              </div>
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
              <rightList :renderData="channelList" title="栏目列表" />
              <rightList :renderData="dateList" title="日期列表" />
            </div>
          </a-col>
        </a-row>
      </div>
    </section>
  </div>
</template>

<script>
import rightList from "@/components/rightList.vue";

export default {
  layout: "container",
  data() {
    return {
      keyWord: "",
      channelList:[
        {
          id:1,
          title:'栏目1'
        },
        {
          id:2,
          title:'栏目2'
        },
        {
          id:3,
          title:'栏目3'
        },
        {
          id:4,
          title:'栏目4'
        },
      ],
      dateList:[
        {
          id:1,
          title:'2020年10月'
        },
        {
          id:2,
          title:'2020年09月'
        },
        {
          id:3,
          title:'2020年08月'
        },
        {
          id:4,
          title:'2020年07月'
        },
        {
          id:5,
          title:'2020年06月'
        },
      ]
    };
  },
  methods: {
    changePage(page) {},
  },
  components: {
    rightList,
  },
  created() {
    this.$store.commit("changeIsHome", false);
    this.keyWord = this.$route.params.value;
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    //   window.onload = () => {
    //     this.$nuxt.$loading.finish();
    //   };
    // });
  },
};
</script>

<style lang="less" scoped>
.aiva_main {
  padding-top: 60px !important;
  .search_title {
    padding-bottom: 20px;
  }
}
</style>
