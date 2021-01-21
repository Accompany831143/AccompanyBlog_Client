<!--
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-21 10:51:33
 * @FilePath: \AivaBlog_Client\pages\User.vue
-->
<template>
  <div class="userInfo">
    <div class="container">
      <a-row>
        <a-col :span="6">
          <leftMenu
            :defaultActive="0"
            :renderData="leftMenuData"
            @on-change="changeTab"
            title="我的资料"
          />
        </a-col>
        <a-col :span="17" offset="1">
          <div class="infoBox boxShadowBase">
            <h3>{{ activeTitle }}</h3>
            <nuxt-child />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import leftMenu from "@/components/rightList.vue";
export default {
  layout: "container",
  data() {
    return {
      activeTitle: "我的喜欢",
      leftMenuData: [
        {
          id: 1,
          title: "我的喜欢",
          path: "/user",
        },
        {
          id: 2,
          title: "资料设置",
          path: "/user/info",
        },
      ],
    };
  },
  components: {
    leftMenu,
  },

  methods: {
    changeTab(router) {
      this.activeTitle = router.title;
      this.$router.push(router.path);
    },
  },
  created() {},
};
</script>

<style lang='less'>
.userInfo {
  min-height: calc(100vh - 40px);
  padding-top: 115px;
  padding-bottom: 40px;
  .infoBox {
    background-color: #fff;
    min-height: calc(100vh - 160px);
    padding: 16px 26px;
    & > h3 {
      margin-bottom: 16px;
    }
  }
}
</style>