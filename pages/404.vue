<!--
 * @Date: 2021-01-07 13:13:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-07 13:33:44
 * @FilePath: \AivaBlog_Client\pages\404.vue
-->
<template>
  <div class="notfound">
    <div class="container">
      <h1>404</h1>
      <p>您访问的页面找不到了 可能已经移动到了新的地址 <nuxt-link to="/">点击这里</nuxt-link> 回到首页</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.notfound {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    h1 {
      color: #d0344e;
      font-size: 100px;
      letter-spacing: 50px;
    }
    p {
        font-size:16px;
        a {
            color:#d0344e;
        }
    }
  }
}
</style>