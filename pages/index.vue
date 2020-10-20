<template>
  <div class="aiva_home">
    <!-- Banner -->
    <section class="banner">
      <div class="container">
        <h1>欢迎来到Aiva的博客</h1>
        <h2>愿你所愿 终能实现</h2>
        <div>
          <a-button type="danger">开始浏览</a-button>
        </div>
      </div>
    </section>

    <!-- Blog Content  -->
    <section class="aiva_main">
      <div class="container">
        <a-row>
          <a-col span="16">
            <div class="article_list">
              <div
                class="article_item"
                v-for="item in [1, 2, 3, 4, 5, 6]"
                :key="item"
              >
                <div class="img_box">
                  <nuxt-link to="">
                    <img src="../assets/imgs/banner_bg.jpg" alt="" />
                  </nuxt-link>
                </div>
                <div class="article_info">
                  <a-tooltip>
                    <template slot="title"
                      >htmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtml</template
                    >
                    <a-tag color="#d0344e" class="channel_tag"
                      >htmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtml</a-tag
                    >
                  </a-tooltip>

                  <div>
                    <a-icon type="eye" />
                    <span>65</span>
                  </div>
                  <div>
                    <a-icon type="like" />
                    <span>32</span>
                  </div>
                </div>
                <h2>
                  <nuxt-link class="linkColor" to=""
                    >webpack配置babel</nuxt-link
                  >
                </h2>
                <div class="article_description">
                  babel是一个javascript编译器，是前端开发中的一个利器。它突破了浏览器实现es标准的限制，使我们在开发中可以使用最新的javascript语法。
                  通过构建和babel，可以使用最新js语法进行开发，最后自动编译成用于浏览器或node环境的代码。
                  babel是一个javascript编译器，是前端开发中的一个利器。它突破了浏览器实现es标准的限制，使我们在开发中可以使用最新的javascript语法。
                  通过构建和babel，可以使用最新js语法进行开发，最后自动编译成用于浏览器或node环境的代码。
                </div>
                <a-button type="primary" ghost>查看文章</a-button>
              </div>
              <div style="text-align: center">
                <a-pagination
                  show-quick-jumper
                  :default-current="1"
                  :total="54"
                  @change="changePage"
                />
              </div>
            </div>
          </a-col>
          <a-col span="6" offset="2">
            <div class="channel_list">
              <div class="menu_item boxShadowBase">
                <p><i></i><span>栏目列表</span></p>
                <ul>
                  <li v-for="item in [1, 2, 3, 4, 5]" :key="item">
                    <a-tooltip placement="left">
                      <template slot="title"> 栏目栏目{{ item }} </template
                      ><nuxt-link class="linkColor" to="">
                        栏目栏目{{ item }}</nuxt-link
                      >
                    </a-tooltip>
                  </li>
                </ul>
              </div>
              <div class="menu_item boxShadowBase">
                <p><i></i><span>日期列表</span></p>
                <ul>
                  <li v-for="item in ['202001','202002','202003','202004','202005','202006']" :key="item">
                    <a-tooltip placement="left">
                      <template slot="title"> 日期日期{{ item }} </template
                      ><nuxt-link class="linkColor" to="">
                        日期日期{{ item }}</nuxt-link
                      >
                    </a-tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "container",
  data() {
    return {};
  },
  methods: {
    changePage(page) {},
  },
};
</script>

<style lang="less">
.aiva_home {
  .banner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: url("../assets/imgs/banner_bg.jpg") no-repeat 0 0 / cover;
    .container {
      padding-top: 60px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      h1,
      h2 {
        color: #fff;
        font-weight: normal;
      }
      h1 {
        font-size: 36px;
      }
      h2 {
        margin: 20px 0 26px 0;
        font-size: 26px;
      }
      .ant-btn-danger {
        background-color: #d0344e;
        border-color: #d0344e;
      }
    }
  }
  .aiva_main {
    padding-top: 100vh;
    margin-top:60px;
    .article_list {
      .article_item {
        padding: 12px;
        height: 540px;
        background-color: #fff;
        margin-bottom: 80px;
        overflow: hidden;
        transition: all .4s ease;
        &:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transform:translateY(-6px);
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
        button {
          margin-top: 20px;
        }
      }
    }
    .channel_list {
      .menu_item {
        background-color: #fff;
        padding: 16px;
        margin-bottom:40px;
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
            a {
              display: block;
              width: 80%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
