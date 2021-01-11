<template>
  <div class="article_item">
    <div class="img_box">
      <nuxt-link :to="'/article/' + info.articleId">
        <img :src="info.articlePicture" alt="" />
      </nuxt-link>
    </div>
    <div class="article_info">
      <a-tooltip>
        <template slot="title">{{info.containerName}}</template>
        <a-tag color="#d0344e" class="channel_tag"
          >{{info.containerName}}</a-tag
        >
      </a-tooltip>

      <div>
        <a-icon type="eye" style="color: #999" />
        <span style="color: #999">{{info.look}}</span>
      </div>
      <div>
        <a-icon type="like" style="color: #999" />
        <span style="color: #999">{{info.good}}</span>
      </div>
      <div>
        <a-icon type="heart" style="color: #999" />
        <span style="color: #999">{{info.love}}</span>
      </div>
    </div>
    <h2>
      <nuxt-link class="linkColor" :to="'/article/' + info.articleId"
        >{{info.articleName}}</nuxt-link
      >
    </h2>
    <div class="article_description">
      {{info.articleDesc}}
    </div>
    <div class="articleTags">
      <a-tag v-for="item in info.activeTag" :key="item.tagId" :color="item.tagColor" :style="{color:item.tagFontColor}">{{item.tagName}}</a-tag>
    </div>
    <a-button type="primary" ghost>查看文章</a-button>
  </div>
</template>

<script>
export default {
  props:{
    info:Object
  },
  data() {
    return {};
  },
  created() {
  }
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
      max-width: 100px;
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