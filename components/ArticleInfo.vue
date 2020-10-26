<template>
  <div class="article_item">
    <div class="img_box">
      <nuxt-link :to="'/article/' + '123'">
        <img src="../assets/imgs/banner_bg.jpg" alt="" />
      </nuxt-link>
    </div>
    <div class="article_info">
      <a-tooltip>
        <template slot="title">htmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtml</template>
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
    <div class="articleTags">
      <a-tag color="red">标签1</a-tag>
      <a-tag color="blue">标签2</a-tag>
      <a-tag color="pink">标签3</a-tag>
    </div>
    <a-button type="primary" ghost>查看文章</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang='less'>
.article_item {
  padding: 12px;
  height: 580px;
  background-color: #fff;
  margin-bottom: 80px;
  overflow: hidden;
  transition: all 0.4s ease;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-6px);
  }
  .img_box {
    width: 100%;
    height: 300px;
    overflow: hidden;
    img {
      width: 100%;
      transition: all 0.4s ease;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .article_info {
    width: 50%;
    display: flex;
    margin-top: 16px;
    & > * {
      margin-right: 20px;
    }
    .channel_tag {
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  h2 {
    font-weight: normal;
    margin-top: 16px;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    a:hover {
      color: #d0344e;
    }
  }
  .article_description {
    color: #999;
    margin-top: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .articleTags {
    margin-top: 16px;
  }
  button {
    margin-top: 20px;
  }
}
</style>