<template>
  <div class="aiva_home">
    <!-- Blog Content  -->
    <section class="result_main">
      <div class="container">
        <p class="search_title">
          <span>搜索到包含</span>
          <span class="primaryColor">{{ keyWord }}</span>
          <span
            >的结果共 <b>{{ 50 }}</b> 条</span
          >
        </p>
        <div class="resultBox">
          <div v-for="item in 20" :key="item">
            <a-card hoverable :bordered="true" style="width: 100%">
              <img
                slot="cover"
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
              <a-card-meta
                title="文文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章章"
                description="文文章文章文章文章文章文章文章文章"
              >
              </a-card-meta>
            </a-card>
          </div>
        </div>
        <div style="text-align: center;padding:20px 0;">
          <a-pagination
            :default-current="1"
            :total="54"
            show-size-changer
            :pageSizeOptions="['20','40','60']"
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
      pageInfo:{
        pageSize:20
      }
    };
  },
  methods: {
    changePage(page,pageSize) {},
    onShowSizeChange(current,size) {
      this.pageInfo.pageSize = size
    }
  },

  created() {
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
}
</style>
