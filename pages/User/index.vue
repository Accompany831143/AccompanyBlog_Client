<!--
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-04-09 14:06:50
 * @FilePath: \AivaBlog_Client\pages\User\index.vue
-->
<template>
  <div class="collection">
    <a-list size="large" :data-source="recommList" v-if="recommList.length">
      <a-list-item slot="renderItem" slot-scope="item">
        <nuxt-link :to="'/article/' + item.articleId">{{ item.articleName }}</nuxt-link>
      </a-list-item>
    </a-list>
    <a-empty v-else-if="isEmpty" />
    <div class="coll-page" v-if="pageInfo.total">
      <a-pagination
        :default-current="1"
        :total="pageInfo.total"
        :defaultPageSize="pageInfo.pageSize"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommList: [],
      isEmpty:false,
      pageInfo:{
        total:0,
        current:1,
        pageSize:5
      }
    };
  },
  methods: {
    changePage(page) {
      this.pageInfo.current = page
      this.getList()
    },
    getList() {
      this.$axios({
        url: "/user/getUserLoves",
        method: "post",
        data:{
          page:this.pageInfo.current
        },
      }).then((res) => {
        if(this.pageInfo.current === 1 && !res.body.result.length) {
          this.isEmpty = true
          return
        }else if(this.pageInfo.current >= 1 || res.body.result) {
          this.isEmpty = false
        }
        this.recommList = res.body.result;
        this.pageInfo = res.body.pageInfo
      });
    },
  },
  created() {
    this.getList();
  },
  head() {
    return {
      title: "我的喜欢- Aiva博客",
    };
  },
};
</script>

<style lang='less'>
.coll-page {
  text-align: center;
  padding-top:20px;
  position:absolute;
  bottom: 50px;
  left:0;
  width: 100%;
}
</style>