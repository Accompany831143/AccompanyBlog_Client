<template>
  <div class="loginBox">
    <div class="container">
      <div class="formBox">
        <a-tabs v-model="activeKey">
          <a-tab-pane tab="登录" key="1">
            <a-form>
              <a-form-item>
                <a-input placeholder="请输入用户名">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input placeholder="请输入密码">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <div class="form_tootip">
                <a-checkbox>记住我</a-checkbox>
                <span class="forgetPwd" @click="showBox = true">忘记密码</span>
              </div>
              <a-form-item>
                <a-button type="primary" block>登录</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane tab="注册" key="2">
            <a-form>
              <a-form-item>
                <a-input placeholder="请输入用户名">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input placeholder="请输入密码">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input placeholder="请输入手机号">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" block>注册并登录</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
        <a-modal v-model="showBox" title="忘记密码" @ok="commitForget">
          <a-form>
            <a-form-item>
              <a-input placeholder="请输入手机号"></a-input>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "container",
  data() {
    return {
      activeKey: "1",
      showBox: false,
    };
  },
  methods: {
    commitForget() {},
  },
};
</script>

<style lang='less'>
.loginBox {
  padding-top: 60px;
  height: calc(100vh - 40px);
  background: url("../../assets/imgs/banner_bg.jpg") no-repeat 0 0 / cover;
  .container {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .formBox {
      width: 400px;
      background-color: #fff;
      padding: 26px;
      border-radius:4px;
      .form_tootip {
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
        span {
          cursor: pointer;
          font-size: 12px;
        }
        .forgetPwd {
          color: #1890ff;
        }
      }
    }
  }
}
</style>