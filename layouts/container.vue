<template>
  <a-locale-provider :locale="locale">
    <div class="accompany">
      <!-- 导航 -->
      <nav :class="{ navbar: true, 'navbar-top': isTop }">
        <div class="container">
          <a-row justify="space-between">
            <a-col span="12">
              <div class="logo"><a class="linkColor" href="/"><img src="../assets/imgs/Aiva.png" alt="Aiva"></a></div>
            </a-col>
            <a-col span="12">
              <div class="navbar_main">
                <ul class="navbar_menu">
                  <li><nuxt-link class="linkColor" to="">文章</nuxt-link></li>
                  <li><nuxt-link class="linkColor" to="">案例</nuxt-link></li>
                  <li><nuxt-link class="linkColor" to="">关于</nuxt-link></li>
                  <li>
                    <a-input-search
                      placeholder="请输入搜索内容"
                      :loading="false"
                    />
                  </li>
                  <li>
                    <a-avatar :size="36" icon="user" />
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
          <span>Copyright © 2020 By Aiva. All Rights Reserved</span>
          <a href="http://beian.miit.gov.cn/" target="_blank"
            >豫ICP备20001126号</a
          >
          <a href="mailto:Accompany_zhao@163.com">邮箱： Accompany_zhao@163.com</a>
          <span>
            <a href="https://github.com/Accompany831143" target="_blank">
              <a-icon type="github"></a-icon>
            </a>
            <a
              style="margin-left: 16px" 
              href="https://www.jianshu.com/u/9ff01840573a"
              target="_blank"
              >简书</a
            >
          </span>
        </div>
      </footer>

      <a-back-top>
        <div class="toTop">
          <a-icon
            type="arrow-up"
            :style="{ fontSize: '20px', color: '#ffffff' }"
          ></a-icon>
        </div>
      </a-back-top>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data() {
    return {
      locale: zhCN,
      isTop: false,
    };
  },
  mounted() {
    window.onscroll = ()=> {
      if (window.scrollY > 0) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    };
  }
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
    height: 60px;
    line-height: 60px;
    transition:all .4s ease;
    .logo {
      font-size: 30px;
      a:hover {
        color: #d0344e;
        
      }
      img {
          height:36px;
          vertical-align:-4px;
        }
    }
    .navbar_menu {
      display: flex;
      li {
        margin: 0 20px;
        a:hover {
          color: #d0344e;
        }
      }
    }
  }
  .footer {
    margin-top: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    .container {
      display: flex;
      justify-content: space-between;
    }
  }
  .toTop {
    width: 40px;
    height: 40px;
    background-color: #d0344e;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
