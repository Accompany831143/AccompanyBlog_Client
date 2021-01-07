<!--
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-07 13:56:43
 * @FilePath: \AivaBlog_Client\pages\about\index.vue
-->
<template>
  <div class="about">
    <div class="container">
      <div class="about_info">
        <div class="info_item">
          <h2>关于我</h2>
          <p>性别：男</p>
          <p>职位：前端开发工程师</p>
          <p style="margin-top: 5px">
            技术：
            <a-tag color="pink">HTML5/CSS3</a-tag>
            <a-tag color="orange">JavaScript</a-tag>
            <a-tag color="purple">Webpack</a-tag>
            <a-tag color="cyan">Node.js</a-tag>
            <a-tag color="green">Vue全家桶</a-tag>
            <a-tag color="blue">React</a-tag>
          </p>
        </div>
        <div class="info_item">
          <h2>关于本站</h2>
          <p style="margin-top: 5px">
            技术栈：
            <a-tag color="green">Nuxt</a-tag>
            <a-tag color="blue">Express</a-tag>
            <a-tag color="cyan">MongoDB</a-tag>
          </p>
        </div>
        <div class="info_item">
          <h2>更新日志</h2>
          <div class="updateInfo">
            <p><b>2021-01-08</b></p>
            <ul>
              <li>1. 新版本上线</li>
            </ul>
          </div>
          <!-- <div class="updateInfo">
            <p><b>2020-02-11</b></p>
            <ul>
              <li>123123</li>
              <li>123123</li>
              <li>123123</li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "container",
  data() {
    return {};
  },
  head() {
    return {
      title: "关于 - Aiva博客",
    };
  },
};
</script>

<style lang='less' scoped>
.about {
  padding-top: 80px;
  min-height: calc(100vh - 40px);
  background-color: #fff;
  padding-bottom: 20px;
  .about_info {
    .info_item {
      font-size: 16px;
      margin-top: 40px;
      &:first-of-type {
        margin-top: 0;
      }
      h2 {
        padding-bottom: 10px;
      }
      .updateInfo {
        ul {
          list-style-type: disc;
          padding-left: 60px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>