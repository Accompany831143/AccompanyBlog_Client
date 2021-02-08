<template>
  <div class="loginBox">
    <div class="container">
      <div class="formBox">
        <a-tabs v-model="activeKey">
          <a-tab-pane tab="登录" key="1">
            <a-form-model
              ref="loginForm"
              :model="formData.login"
              :rules="validate.registered"
            >
              <a-form-model-item prop="userTel">
                <a-input
                  placeholder="请输入手机号码"
                  v-model="formData.login.userTel"
                >
                  <a-icon slot="prefix" type="phone" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="userPassword">
                <a-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="formData.login.userPassword"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-model-item>
              <div class="form_tootip">
                <a-checkbox v-model="keepFlag">记住账号</a-checkbox>
                <span class="forgetPwd" @click="showBox = true">忘记密码</span>
              </div>
              <a-form-model-item>
                <a-button type="primary" block @click="loginSubmit"
                  >登录</a-button
                >
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
          <a-tab-pane tab="注册" key="2">
            <a-form-model
              ref="registeredForm"
              :model="formData.registered"
              :rules="validate.registered"
            >
              <a-form-model-item prop="userName">
                <a-input
                  placeholder="请输入用户名"
                  v-model="formData.registered.userName"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="userTel">
                <a-input
                  placeholder="请输入手机号码"
                  v-model="formData.registered.userTel"
                >
                  <a-icon slot="prefix" type="phone" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="userPassword">
                <a-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="formData.registered.userPassword"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="userPasswordAuth">
                <a-input
                  type="password"
                  placeholder="请再次输入密码"
                  v-model="formData.registered.userPasswordAuth"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="userEmail">
                <a-input
                  type="text"
                  placeholder="请输入邮箱"
                  v-model="formData.registered.userEmail"
                >
                  <a-icon slot="prefix" type="mail" />
                </a-input>
              </a-form-model-item>
              <a-form-item>
                <a-button type="primary" block @click="registeredSubmit"
                  >注册并登录</a-button
                >
              </a-form-item>
            </a-form-model>
          </a-tab-pane>
        </a-tabs>
        <a-modal v-model="showBox" title="修改密码" @ok="commitForget">
          <a-form-model
            :model="formData.forgetPwd"
            :rules="validate.registered"
            ref="forgetPwd"
          >
            <a-form-model-item prop="userTel">
              <a-input
                placeholder="请输入手机号"
                v-model="formData.forgetPwd.userTel"
              >
                <a-icon slot="prefix" type="phone" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="userEmail">
              <a-input
                placeholder="请输入邮箱"
                v-model="formData.forgetPwd.userEmail"
              >
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="userPassword">
              <a-input
                type="password"
                placeholder="请输入新密码"
                v-model="formData.forgetPwd.userPassword"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-model-item>
          </a-form-model>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Env from '../../plugins/envConst'

export default {
  layout: "container",
  data() {
    return {
      activeKey: "1",
      showBox: false,
      keepFlag: true,
      formData: {
        registered: {
          userName: "",
          userTel: "",
          userPassword: "",
          userPasswordAuth: "",
          userEmail: "",
        },
        login: {
          userTel:'',
          userPassword: "",
        },
        forgetPwd: {
          userTel: "",
          userEmail: "",
          userPassword: "",
        },
      },
      validate: {
        registered: {
          userName: [
            {
              tigger: "blur",
              validator(rule, val, fn) {
                if (val === "") {
                  fn(new Error("请输入用户名"));
                } else {
                  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/;
                  if (reg.test(val)) {
                    fn();
                  } else {
                    fn(new Error("用户名不可包含非法字符"));
                  }
                }
              },
            },
          ],
          userTel: [
            {
              tigger: "blur",
              validator(rule, val, fn) {
                if (val === "") {
                  fn(new Error("请输入手机号码"));
                } else {
                  let reg = /^[1][3,4,5,7,8，9][0-9]{9}$/;
                  if (reg.test(val)) {
                    fn();
                  } else {
                    fn(new Error("请输入正确的手机号码"));
                  }
                }
              },
            },
          ],
          userEmail: [
            {
              tigger: "blur",
              validator(rule, val, fn) {
                if (val === "") {
                  fn(new Error("请输入邮箱"));
                } else {
                  let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                  if (reg.test(val)) {
                    fn();
                  } else {
                    fn(new Error("请输入正确的邮箱"));
                  }
                }
              },
            },
          ],
          userPassword: [
            {
              tigger: "blur",
              validator: (rule, val, fn) => {
                if (val === "") {
                  fn(new Error("请输入密码"));
                } else {
                  let reg = /^[0-9a-zA-Z\._@]{6,16}$/;
                  if (reg.test(val)) {
                    fn();
                  } else {
                    fn(new Error("密码格式错误"));
                  }
                }
              },
            },
          ],
          userPasswordAuth: [
            {
              tigger: "blur",
              validator: (rule, val, fn) => {
                if (val === "") {
                  fn(new Error("请再次输入密码"));
                } else {
                  if (val !== this.formData.registered.userPassword) {
                    fn(new Error("两次输入的密码不一致"));
                    return;
                  }
                  let reg = /^[0-9a-zA-Z\._@]{6,16}$/;
                  if (reg.test(val)) {
                    fn();
                  } else {
                    fn(new Error("密码格式错误"));
                  }
                }
              },
            },
          ],
          userOldPassword: [
            {
              tigger: "blur",
              validator: (rule, val, fn) => {
                if (val === "") {
                  fn(new Error("请输入密码"));
                } else {
                  let reg = /^[0-9a-zA-Z\._@]{6,16}$/;
                  if (reg.test(val)) {
                    fn();
                  } else {
                    fn(new Error("密码格式错误"));
                  }
                }
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    commitForget() {
      this.$refs.forgetPwd.validate((flag) => {
        if (flag) {
          this.$axios({
            url: "/user/resetPwd",
            method: "post",
            data: this.formData.forgetPwd,
          }).then((res) => {
            this.$message.success("修改成功！");
          });
        }
      });
    },
    registeredSubmit() {
      this.$refs.registeredForm.validate((flag) => {
        if (flag) {
          let formData = { ...this.formData.registered };
          delete formData.userPasswordAuth;
          this.$axios({
            url: "/user/add",
            method: "post",
            data: {
              createDate: new Date().getTime(),
              ...formData,
            },
          }).then((res) => {
            this.$message.success("注册成功，请登录！");
            this.activeKey = '1'
            this.formData.login.userTel = ''
            this.formData.registered = {
              userName: "",
              userTel: "",
              userPassword: "",
              userPasswordAuth: "",
            };
          });
        }
      });
    },
    loginSubmit() {
      this.$refs.loginForm.validate((flag) => {
        if (flag) {
          this.$axios({
            url: "/user/login",
            method: "post",
            data: {
              ...this.formData.login,
            },
          }).then((res) => {
            if (!res) {
              return;
            }
            res = res.body;
            sessionStorage.setItem("token", res.token);
            if (this.keepFlag) {
              localStorage.setItem("userTel", this.formData.login.userTel);
            }else {
              localStorage.removeItem('userTel')
            }

            this.$store.dispatch("getUserInfo",() => {
              this.formData.login = {
              userTel: "",
              userPassword: "",
            };
              this.$store.commit("changeLoginStatus", true);
              this.$message.success("登录成功！");
              this.$router.push("/");
            });
            
          });
        }
      });
    },
  },
  head(){
    return{
      title:'登录 - Aiva博客'
    }
  },
  mounted() {
    this.formData.login.userTel = localStorage.getItem("userTel") || ""
  }
};
</script>

<style lang='less'>
.loginBox {
  padding-top: 115px;
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
      border-radius: 4px;
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