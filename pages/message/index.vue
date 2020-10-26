<template>
  <div class="message">
    <div class="container">
      <div class="form">
        <div class="article_comments">
          <p style="margin-bottom: 20px"><b>留言板</b></p>
          <div class="formContent">
            <div>
              <a-textarea
                :maxLength="500"
                allowClear
                placeholder="请输入内容"
                :rows="6"
              />
            </div>
            <div style="margin-top: 20px; text-align: right">
              <a-button style="background: #d0344e; color: #fff">发表</a-button>
            </div>
          </div>
          <div class="commentContent">
            <a-comment v-for="item in 6" :key="item">
              <a slot="author">用户{{ item }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="用户01"
              />
              <p slot="content">这是第{{ item }}条评论</p>
              <a-tooltip slot="datetime" title="2020-10-21">
                <span>2020-10-21</span>
              </a-tooltip>
            </a-comment>
          </div>
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
};
</script>

<style lang='less' scoped>
.message {
  min-height: calc(100vh - 40px);
  padding-top: 80px;
  padding-bottom: 20px;
  background-color: #fff;
}
</style>