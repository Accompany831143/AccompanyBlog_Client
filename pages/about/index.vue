<!--
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-21 14:00:31
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
          <div class="updateInfo" v-for="item in updateLogs" :key="item.tag">
            <p><b>{{item.tag}}</b></p>
            <p><a-tag>{{item.date}}</a-tag></p>
            <ul>
              <li v-for="i in item.logs" :key="i">{{i}}</li>
            </ul>
          </div>
          <!-- <div class="updateInfo">
            <p><b>1.0.0</b></p>
            <p><a-tag>2021-01-08</a-tag></p>
            <ul>
              <li>1. 新版本上线</li>
            </ul>
          </div> -->
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
    return {
      updateLogs:[
        {
          id:2,
          tag:'1.0.1',
          date:'2021-01-21',
          logs:[
            "1. 移动端显示优化",
            "2. 修复了一些小问题"
          ]
        },
        {
          id:1,
          tag:'1.0.0',
          date:'2021-01-08',
          logs:[
            "1. 新版本上线"
          ]
        },
        
      ]
    };
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
  padding-top: 115px;
  min-height: calc(100vh - 40px);
  background-color: #fff;
  padding-bottom: 20px;
  .about_info {
    .info_item {
      font-size: 16px;
      margin-top: 40px;
      p {
        line-height:30px;
      }
      &:first-of-type {
        margin-top: 0;
      }
      h2 {
        padding-bottom: 10px;
      }
      .updateInfo {
        p>b {
          font-size:20px;
        }
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