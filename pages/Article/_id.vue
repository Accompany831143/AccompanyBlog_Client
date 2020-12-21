<template>
  <div class="article_detail">
    <div class="container">
      <a-row>
        <a-col span="16">
          <article class="boxShadowBase">
            <div class="article_header">
              <h1>{{detail.articleName}}</h1>
              <p>
                <span
                  ><a-icon type="calendar" />&ensp;{{detail.releaseTime}}</span
                >
                <span><a-icon type="eye" />&ensp;66</span>
                <span><a-icon type="like" />&ensp;32</span>
                <span><a-icon type="heart" />&ensp;22</span>
                <span>
                  <a-icon type="appstore" />&ensp;
                  <b class="ellipsis">{{detail.containerName}}</b>
                </span>
              </p>
            </div>
            <div class="article_body custom-html-style" v-html="detail.articleBody"></div>
            <div class="article_action">
              <div>
                <a-icon
                  type="like"
                  @click="changIcon('like')"
                  :class="{ primaryColor: iconControl.like }"
                  :theme="iconControl.like ? 'filled' : 'outlined'"
                />
              </div>
              <div>
                <a-icon
                  type="heart"
                  @click="changIcon('heart')"
                  :class="{ primaryColor: iconControl.heart }"
                  :theme="iconControl.heart ? 'filled' : 'outlined'"
                />
              </div>
              <div>
                <a-icon
                  type="share-alt"
                  @click="changIcon('share')"
                  :class="{ primaryColor: iconControl.share }"
                />
              </div>
              <div v-show="iconControl.share">
                <div><a-icon type="wechat" /></div>
                <div><a-icon type="weibo-circle" /></div>
                <div><a-icon type="qq" /></div>
              </div>
            </div>
            
          </article>
          <div class="article_comments boxShadowBase">
            <p style="margin-bottom:20px;"><b>发表评论</b></p>
              <div class="formContent">
                <div>
                  <a-textarea
                    :maxLength="500"
                    allowClear
                    placeholder="请输入内容"
                    :rows="6"
                  />
                </div>
                <div style="margin-top: 20px;text-align:right;">
                  <a-button style="background: #d0344e; color: #fff"
                    >发表</a-button
                  >
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
        </a-col>
        <a-col span="6" offset="2">
          <div class="channel_list">
            <div class="menu_item boxShadowBase">
              <p><i></i><span>推荐文章</span></p>
              <ul>
                <li v-for="item in recommList" :key="item.articleId">
                  <nuxt-link to="">
                    <div class="recommArticle">
                      <a-row>
                        <a-col span="8"
                          ><div class="leftImg">
                            <img
                              :src="item.articlePicture"
                              alt=""
                            /></div
                        ></a-col>
                        <a-col span="13" offset="1">
                          <div class="rightInfo">
                            <a-tooltip>
                              <template slot="title">
                                {{item.articleName}}</template
                              >
                              <div class="ellipsis">
                                {{item.articleName}}
                              </div>
                            </a-tooltip>
                            <p>
                              <a-tag color="#d0344e" class="ellipsis"
                                >{{item.containerName}}</a-tag
                              >
                              <span style="color: #999">{{item.releaseTime}}</span>
                            </p>
                          </div>
                        </a-col>
                      </a-row>
                    </div>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  layout: "container",
  data() {
    return {
      params: {},
      iconControl: {
        like: false,
        heart: false,
        share: false,
      },
      detail:{},
      recommList:[]
    };
  },
  methods: {
    changIcon(type) {
      this.iconControl[type] = !this.iconControl[type];
    },
    getArticleDetail() {
      this.$axios({
        url:'/article/detail',
        params:{
          id:this.params.id
        }
      }).then(res => {
        res.body.data.releaseTime = Moment(res.body.data.releaseTime).format('YYYY年MM月DD日 HH:mm:ss')
        this.detail = res.body.data
      })
    },
    getRecommArticle(){
      this.$axios({
        url:'/article/recomm',
      }).then(res => {
        res.body.data = res.body.data.map(item => {
          item.releaseTime = Moment(item.releaseTime).format('YYYY/MM/DD')
          return item
        })
        this.recommList = res.body.data
      })
    }
  },
  created() {
    this.params = this.$route.params;
    this.getArticleDetail()
    this.getRecommArticle()
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      window.onload = () => {
        this.$nuxt.$loading.finish();
      };
    });
  },
};
</script>

<style lang='less'>
.article_detail {
  padding-top: 60px;
  padding-bottom: 40px;
  min-height: 100vh;
  .container {
    padding-top: 20px;
    article {
      background-color: #fff;
      padding: 26px;
      .article_header {
        border-bottom: 1px solid #ddd;
        padding-bottom: 20px;
        h1 {
          text-align: center;
          color: #d0344e;
          font-weight: bold;
        }
        p {
          padding-top: 20px;
          display: flex;
          justify-content: center;
          & > * {
            margin-right: 20px;
          }
          & > *:last-child {
            margin-right: 0;
          }
          & * {
            color: #999;
          }
          b.ellipsis {
            font-weight: normal;
            display: inline-block;
            width: 100px;
            float: right;
          }
        }
      }
      .article_action {
        margin-top: 20px;
        padding: 20px 0;
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: flex-end;
        & > div,
        & > div > div {
          margin-right: 20px;
          transition:all .4s ease;
          & > .anticon {
            cursor: pointer;
          }
        }
        & > div:last-child {
          margin-right: 0;
          display: flex;
          & > div:last-child {
            margin-right: 0;
          }
        }
      }
      
    }
    .article_comments {
      margin-top:40px;
      background-color: #fff;
      padding:26px;
      .commentContent {
        margin-top: 20px;
      }
    }
    .channel_list {
      .menu_item {
        background-color: #fff;
        padding: 16px;
        margin-bottom: 40px;
        p {
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: #d0344e;
            margin-right: 10px;
          }
          span {
            font-size: 14px;
            font-weight: bold;
          }
        }
        ul {
          margin-top: 10px;
          li {
            border-bottom: 1px solid #ddd;
            padding: 6px 0;
            .leftImg {
              height: 50px;
              overflow: hidden;
              img {
                width: 100%;
                height:100%;
              }
            }
            .rightInfo {
              height: 50px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              span {
                font-weight: normal;
              }
              & > p {
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }
      }
    }
  }
}
</style>