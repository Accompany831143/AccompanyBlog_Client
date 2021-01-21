<template>
  <a-config-provider :locale="locale">
    <div class="accompany">
      <!-- 导航 -->
      <nav :class="{ navbar: true, 'navbar-top': getScrollState }">
        <div class="container">
          <a-row justify="space-between">
            <a-col :xs="10" :sm="10" :md="10" :xl="14">
              <div class="logo">
                <nuxt-link class="linkColor" to="/"
                  ><img src="../assets/imgs/Aiva.png" alt="Aiva"
                /></nuxt-link>
              </div>
            </a-col>
            <a-col :xs="0" :sm="0" :md="0" :xl="10">
              <div class="navbar_main">
                <ul class="navbar_menu">
                  <li>
                    <nuxt-link class="linkColor" to="/">首页</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link class="linkColor" to="/timeLine"
                      >时间轴</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link class="linkColor" to="/about">关于</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link class="linkColor" to="/message"
                      >留言板</nuxt-link
                    >
                  </li>

                  <li>
                    <a-input-search
                      placeholder="请输入搜索内容"
                      :loading="false"
                      allowClear
                      @search="onSearch"
                    />
                  </li>
                  <li>
                    <a-avatar
                      style="cursor: pointer"
                      @click="avatarHandler"
                      :size="36"
                      icon="user"
                      v-if="$route.name !== 'Login' && !$store.state.logined"
                    />
                    <a-dropdown
                      v-if="$route.name !== 'Login' && $store.state.logined"
                    >
                      <a
                        class="ant-dropdown-link"
                        style="display: block"
                        @click="(e) => e.preventDefault()"
                      >
                        <img
                          :src="$store.state.userInfo.userAvatar"
                          width="26"
                          style="border-radius: 50%"
                          alt=""
                        />
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item>
                          <nuxt-link to="/user">个人信息</nuxt-link>
                        </a-menu-item>
                        <a-menu-item>
                          <a href="javascript:;" @click="exitUser">退出登录</a>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </li>
                </ul>
              </div>
            </a-col>
          </a-row>
        </div>
      </nav>

      <nuxt />

      <footer class="footer">
        <div class="container">
          <a-row type="flex" justify="space-between" class="res-pd-l">
            <a-col :xs="24" :sm="12" :md="12" :xl="6">
              <span>Copyright © 2020 By Aiva. All Rights Reserved</span>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12" :xl="5">
              <span>
                邮箱：
                <a href="mailto:Accompany_zhao@163.com"
                  >Accompany_zhao@163.com</a
                >
              </span>
            </a-col>
            <a-col
              :xs="24"
              :sm="24"
              :md="24"
              :xl="5"
              class="res-text-left"
              style="text-align: right"
            >
              <span>
                <a href="http://beian.miit.gov.cn/" target="_blank"
                  >豫ICP备20001126号</a
                >
                <a
                  href="https://github.com/Accompany831143"
                  target="_blank"
                  style="margin-left: 16px"
                >
                  <a-icon type="github"></a-icon>
                </a>
                <a
                  style="margin-left: 16px"
                  href="https://www.jianshu.com/u/9ff01840573a"
                  target="_blank"
                  >简书</a
                >
              </span>
            </a-col>
          </a-row>
        </div>
      </footer>

      <a-back-top :visibilityHeight="visibilityHeight">
        <div class="toTop">
          <a-icon
            type="arrow-up"
            :style="{ fontSize: '20px', color: '#ffffff' }"
          ></a-icon>
        </div>
      </a-back-top>

      <div id="loading" v-show="$store.state.isLoading">
        <div class="main">
          <a-icon
            type="setting"
            theme="twoTone"
            two-tone-color="#d0344e"
            spin
          />
          <a-icon
            type="setting"
            theme="twoTone"
            two-tone-color="#dc7637"
            spin
          />
          <a-icon
            type="setting"
            theme="twoTone"
            two-tone-color="#a42982"
            spin
          />
          <a-icon
            type="setting"
            theme="twoTone"
            two-tone-color="#55bc2f"
            spin
          />
        </div>
      </div>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import Env from "../plugins/envConst";
export default {
  data() {
    return {
      locale: zhCN,
      isTop: false,
      visibilityHeight: 500,
      showLoginAvatar: true,

      showUserAvatar: false,
    };
  },
  methods: {
    onSearch(val, e) {
      if (val) {
        this.$router.push({ name: "Search-value", params: { value: val } });
      } else {
        this.$message.warn("请输入搜索内容");
      }
    },
    avatarHandler() {
      this.$router.push("/login");
    },
    exitUser() {
      sessionStorage.clear();
      this.$store.commit("changeLoginStatus", false);
      this.$store.commit("changeUserInfo", {});
      this.$router.push("/");
    },
  },
  computed: {
    getScrollState() {
      if (this.$store.state.isHome) {
        return this.isTop;
      } else {
        return true;
      }
    },
  },
  created() {},

  mounted() {
    console.log("%cAiva", "color:#d0344e;font-size:22px;font-weight:bold;");
    console.log(
      "%c愿你所愿，终能实现。",
      "color:#d0344e;font-size:18px;font-weight:bold;"
    );
    let token = sessionStorage.getItem("token");
    if (token) {
      this.$store.commit("changeLoginStatus", true);
      this.$store.dispatch("getUserInfo");
    }
    this.$nextTick(() => {
      window.onload = () => {
        this.$store.commit('changeLoading',false)
      };
    });
    if (window.innerWidth <= 1200) {
      document.querySelector(".navbar").style.position = "absolute";
      return;
    }
    this.visibilityHeight = window.innerHeight * 2;
    window.onscroll = () => {
      if (window.scrollY > 0) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    };
  },
};
</script>

<style lang="less">
.accompany {
  .navbar-top {
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    .logo > a,
    li > a {
      color: rgba(0, 0, 0, 0.65) !important;
      &:hover {
        color: #d0344e !important;
      }
    }
  }
  .navbar {
    .logo > a,
    li > a {
      color: #fff;
    }
  }
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99999;
    height: 95px;
    line-height: 95px;
    transition: all 0.4s ease;
    .logo {
      font-size: 30px;
      a:hover {
        color: #d0344e;
      }
      img {
        // height: 36px;
        vertical-align: -4px;
      }
    }
    .navbar_menu {
      display: flex;
      justify-content: space-between;
      li {
        a:hover {
          color: #d0344e;
        }
      }
    }
  }
  .footer {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    .container {
      display: flex;
      justify-content: space-between;
    }
    .ant-row-flex {
      background-color: #fff;
      width: 100%;
    }
  }
  .toTop {
    width: 30px;
    height: 30px;
    background-color: #d0344e;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(255, 255, 255);
    z-index: 999999;
    .main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 95px;
      height: 95px;
      // background-color: #f8f8f8;
      & > i {
        font-size: 50px;
        position: absolute;
      }
      @animate:loading1 1.6s ease infinite alternate;
      & > i:first-of-type {
        top: 0;
        left: 0;
        animation: @animate;
        z-index: 999;
      }
      & > i:nth-of-type(2) {
        top: 0;
        right: 0;
        animation: @animate;
      }
      & > i:nth-of-type(3) {
        bottom: 0;
        left: 0;
        animation: @animate;
      }
      & > i:last-of-type {
        bottom: 0;
        right: 0;
        animation: @animate;
      }
    }
  }
}
@keyframes loading1 {
  from {
    opacity: 1;
  }
  to {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
  }
}
</style>
