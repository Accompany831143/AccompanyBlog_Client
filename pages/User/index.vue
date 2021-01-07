<!--
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-07 13:37:39
 * @FilePath: \AivaBlog_Client\pages\User\index.vue
-->
<template>
  <div class="collection">
    <a-list size="large" :data-source="recommList" v-if="recommList.length">
      <a-list-item slot="renderItem" slot-scope="item">
        <nuxt-link :to="'/article/' + item.articleId">{{ item.articleName }}</nuxt-link>
      </a-list-item>
    </a-list>
    <a-empty v-else />
    <div style="text-align: center;padding-top:20px;" v-if="pageInfo.total">
      <a-pagination
        :default-current="1"
        :total="this.pageInfo.total"
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
      pageInfo:{
        total:0,
        current:1
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
</style>