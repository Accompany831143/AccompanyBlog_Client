<template>
  <div class="aiva_home">
    <!-- Blog Content  -->
    <section class="result_main">
      <div class="container">
        <p class="search_title">
          <span>搜索到包含</span>
          <span class="primaryColor">{{ keyWord }}</span>
          <span
            >的结果共 <b>{{ pageInfo.total }}</b> 条</span
          >
        </p>
        <div class="resultBox">
          <div v-for="item in articleList" :key="item.articleId">
            <a-card hoverable :bordered="true" style="width: 100%">
              <img slot="cover" alt="example" :src="item.articlePicture" />
              <a-card-meta :title="item.articleName">
                <p slot="description" class="cardMetaSlot">
                  {{ item.articleDesc }}
                </p>
              </a-card-meta>
            </a-card>
          </div>
        </div>
        <div style="text-align: center; padding: 20px 0">
          <a-pagination
            :default-current="1"
            :total="pageInfo.total"
            show-size-changer
            :pageSizeOptions="['12', '20']"
            :pageSize="pageInfo.pageSize"
            @change="changePage"
            @showSizeChange="onShowSizeChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "container",
  data() {
    return {
      keyWord: "",
      pageInfo: {
        current: 1,
        total: 0,
        pageSize: 12,
      },
      articleList: [],
    };
  },
  methods: {
    // 获取文章
    getArticle() {
      this.$axios({
        url: "/article/search",
        params: {
          keyword: this.keyWord,
          page: this.pageInfo.current,
          pageSize: this.pageInfo.pageSize,
        },
      }).then((res) => {
        res = res.body;
        this.articleList = res.data;
        this.pageInfo = res.pageInfo;
      });
    },

    changePage(page, pageSize) {},
    onShowSizeChange(current, size) {
      this.pageInfo.pageSize = size;
    },
  },
  head(){
    return{
      title: this.keyWord + ' 的搜索结果'
    }
  },

  created() {
    this.keyWord = this.$route.params.value;
    this.getArticle();
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
.result_main {
  min-height: calc(100vh - 60px);
  background-color: #fff;
  .search_title {
    padding-top: 80px;
    padding-bottom: 20px;
  }
  .resultBox {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    & > div {
      width: calc(25% - 30px);
      margin-right: 30px;
      // background-color: #fff;
      // padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      img {
      }
    }
  }
  .cardMetaSlot {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
