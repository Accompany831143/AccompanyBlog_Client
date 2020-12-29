<template>
  <div class="article_detail">
    <div class="container">
      <a-row>
        <a-col span="16">
          <article class="boxShadowBase">
            <div class="article_header">
              <h1>{{ detail.articleName }}</h1>
              <p>
                <span
                  ><a-icon type="calendar" />&ensp;{{
                    detail.releaseTime
                  }}</span
                >
                <span><a-icon type="eye" />&ensp;{{ detail.look }}</span>
                <span><a-icon type="like" />&ensp;{{ detail.good }}</span>
                <span><a-icon type="heart" />&ensp;{{ detail.love }}</span>
                <span>
                  <a-icon type="appstore" />&ensp;
                  <b class="ellipsis">{{ detail.containerName }}</b>
                </span>
              </p>
            </div>
            <div
              class="article_body custom-html-style"
              v-html="detail.articleBody"
            ></div>
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
                <!-- <div><a-icon type="wechat" @click="toShare('weChat')" /></div> -->
                <div>
                  <a-icon type="weibo-circle" @click="toShare('weibo')" />
                </div>
                <div><a-icon type="qq" @click="toShare('qq')" /></div>
              </div>
            </div>
          </article>
          <div class="article_comments boxShadowBase">
            <p style="margin-bottom: 20px"><b>发表评论</b></p>
            <div class="formContent">
              <div>
                <a-textarea
                  :maxLength="500"
                  allowClear
                  placeholder="请输入内容"
                  :rows="6"
                  v-model="commentContent"
                />
              </div>
              <div style="margin-top: 20px; text-align: right">
                <a-button
                  @click="commitMessage"
                  style="background: #d0344e; color: #fff"
                  >发表</a-button
                >
              </div>
            </div>
            <div class="commentContent">
              <a-comment v-for="item in messageList" :key="item._id">
                <a slot="author">{{ item.userName }}</a>
                <a-avatar slot="avatar" :src="item.userAvatar" alt="用户01" />
                <p slot="content">{{ item.content }}</p>
                <a-tooltip slot="datetime" :title="item.releaseTime">
                  <span>{{ item.releaseTime }}</span>
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
                            <img :src="item.articlePicture" alt="" /></div
                        ></a-col>
                        <a-col span="13" offset="1">
                          <div class="rightInfo">
                            <a-tooltip>
                              <template slot="title">
                                {{ item.articleName }}</template
                              >
                              <div class="ellipsis">
                                {{ item.articleName }}
                              </div>
                            </a-tooltip>
                            <p>
                              <a-tag color="#d0344e" class="ellipsis">{{
                                item.containerName
                              }}</a-tag>
                              <span style="color: #999">{{
                                item.releaseTime
                              }}</span>
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
      commentContent: "",
      detail: {},
      recommList: [],
      messageList: [],
      desc:''
    };
  },
  methods: {
    changIcon(type) {
      let typeInfo = {
        like: {
          url: "/article/dianZan",
          data: {
            good: this.iconControl.like ? -1 : 1,
            id: this.params.id,
          },
        },
        heart: {
          url: "/article/love",
          data: {
            love: this.iconControl.heart ? -1 : 1,
            id: this.params.id,
          },
        },
      };
      if (type === "share") {
        this.iconControl[type] = !this.iconControl[type];
      } else {
        let token = sessionStorage.getItem("token");
        if (token) {
          this.$axios(Object.assign({ method: "post" }, typeInfo[type])).then(
            (res) => {
              if (res) {
                this.iconControl[type] = !this.iconControl[type];
                this.$store.dispatch("getUserInfo");
              }
            }
          );
        } else {
          this.$message.warn("您还没有登录！");
          return;
        }
      }
    },
    toShare(name) {
      if (name === "weChat") {
      } else if (name === "qq") {
        let title = this.detail.articleName;
        let path = window.location.href;
        let url = `https://connect.qq.com/widget/shareqq/index.html?url=${path}&title=${title}&pics=${this.detail.articlePicture}`;

        window.open(url, "_blank");
      } else if (name === "weibo") {
        let title = this.detail.articleName;
        let path = window.location.href;
        let url = `http://service.weibo.com/share/share.php?url=${path}&title=${title}&pic=${this.detail.articlePicture}`;

        window.open(url, "_blank");
      }
    },
    getArticleDetail() {
      this.$axios({
        url: "/article/detail",
        params: {
          id: this.params.id,
        },
      }).then((res) => {
        res.body.data.releaseTime = Moment(res.body.data.releaseTime).format(
          "YYYY年MM月DD日 HH:mm:ss"
        );
        this.detail = res.body.data;
        this.desc = res.body.data.activeTagInfo.map(item => {
          return item.tagName
        }).join(',')
        let token = sessionStorage.getItem("token");
        if (token) {
          let user = this.$store.state.userInfo;
          if (user.goods.includes(this.detail.articleId)) {
            this.iconControl.like = true;
          }
          if (user.loves.includes(this.detail.articleId)) {
            this.iconControl.heart = true;
          }
        }
      });
    },
    getRecommArticle() {
      this.$axios({
        url: "/article/recomm",
      }).then((res) => {
        res.body.data = res.body.data.map((item) => {
          item.releaseTime = Moment(item.releaseTime).format("YYYY/MM/DD");
          return item;
        });
        this.recommList = res.body.data;
      });
    },
    addLook() {
      this.$axios({
        url: "/article/addEye",
        method: "post",
        data: {
          id: this.params.id,
        },
      }).then((res) => {
        // console.log(res);
      });
    },
    commitMessage() {
      let token = sessionStorage.getItem("token");
      if (token) {
        if (this.commentContent === "") {
          this.$message.warn("请输入评论内容！");
        } else {
          let userInfo = this.$store.state.userInfo;
          this.$axios({
            url: "/article/message/add",
            method: "post",
            data: {
              content: this.commentContent,
              id: this.params.id,
              userName: userInfo.userName,
              userId: userInfo.userId,
              userAvatar: userInfo.userAvatar,
              releaseTime: new Date().getTime(),
            },
          }).then((res) => {
            console.log(res);
          });
        }
      } else {
        this.$message.warn("您还没有登录！");
      }
    },
    getArticleMessage() {
      this.$axios({
        url: "/article/message/latest",
        params: {
          id: this.params.id,
        },
      }).then((res) => {
        this.messageList = res.body.result.map((item) => {
          item.releaseTime = this.$Moment(new Date(item.releaseTime)).format(
            "YYYY年MM月DD日 HH:mm:ss"
          );
          return item;
        });
      });
    },
  },
  created() {
    this.params = this.$route.params;
    this.getArticleDetail();
    this.getRecommArticle();
    this.getArticleMessage();
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.addLook();
      window.onload = () => {
        this.$nuxt.$loading.finish();
      };
    });
  },
  head(){
    return{
      title: this.detail.articleName + '- Aiva博客',
      meta:[
        { hid: 'description', name: 'description', content:this.detail.articleDesc},
        { hid: 'keywords', name: 'keywords', content:this.desc},
      ]
    }
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
          transition: all 0.4s ease;
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
      margin-top: 40px;
      background-color: #fff;
      padding: 26px;
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
                height: 100%;
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