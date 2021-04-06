<template>
  <div v-if="userInfo.length > 0">
    <a-form-model
      ref="formBox"
      :model="formData"
      :rules="validate"
      :labelCol="{ span: 2 }"
      :wrapperCol="{ span: 8, offset: 1 }"
    >
      <a-form-model-item
        class="info_item"
        v-for="item in userInfo"
        :key="item.type"
        :label="item.label"
        :prop="item.type"
      >
        <div v-if="item.type === 'userAvatar'">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :headers="uploadHeaders"
            withCredentials
            :show-upload-list="false"
            :action="uploadUrl"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              v-if="formData.userAvatar"
              width="100"
              :src="formData.userAvatar"
              alt="用户头像"
            />
          </a-upload>
        </div>
        <div v-else-if="item.type === 'userSex'">
          <a-radio-group v-model="formData[item.type]">
            <a-radio :value="'0'"> 男 </a-radio>
            <a-radio :value="'1'"> 女 </a-radio>
          </a-radio-group>
        </div>
        <!-- <div v-if="item.type !== 'userAvatar' && item.type !== 'userSex'"> -->
        <div v-else>
          <a-input v-model="formData[item.type]" />
        </div>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="submit">提交</a-button>
        <a-button style="margin-left: 20px" @click="getInfo">重置</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Env from "../../plugins/envConst";

export default {
  data() {
    return {
      loading: false,
      uploadUrl: Env.baseUrl + "user/uploadAvatar",
      uploadHeaders: {},
      userInfo: [],
      charType: {
        userAvatar: "头像",
        userTel: "手机号码",
        userName: "用户名",
        userSex: "性别",
        userEmail: "邮箱",
      },
      validate: {
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
      },
      formData: {
        userAvatar: "",
        userTel: "",
        userName: "",
        userSex: "",
        userEmail: "",
      },
    };
  },
  methods: {
    handleChange(info) {
      let res = info.file.response;
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        if (res) {
          this.getInfo();
          this.$message.success("头像上传成功！");
        }
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("只可以上传 jpg 或者 png 类型的图片！");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不可超过2M!");
      }
      return isJpgOrPng && isLt2M;
    },
    getInfo() {
      this.$store.dispatch('getUserInfo',() => {
        let res = this.$store.state.userInfo;
        let arr = [];
        for (let k in res) {
          if (res.hasOwnProperty(k)) {
            arr.push({
              type: k,
              value: res[k],
              label: this.charType[k],
              isEdit: false,
            });
          }
        }
        arr = arr.filter((item, index) => {
          return item.label;
        });
        arr.forEach((item) => {
          for (let k in res) {
            if (this.formData.hasOwnProperty(k)) {
              if (item.type === k) {
                this.formData[k] = item.value;
              }
            }
          }
        });
        this.userInfo = arr;
      })
    },
    submit() {
      // this.formData.userAvatar = this.formData.userAvatar.replace(Env.pathUrl,'')
      // console.log(this.formData)
      // return
      this.$refs.formBox.validate((flag) => {
        if (flag) {
          this.$axios({
            url: "/user/update",
            method: "post",
            data: this.formData,
          }).then((res) => {
            this.$message.success("修改成功！");
            this.getInfo();
          });
        }
      });
    },
    
  },
  mounted() {
    this.uploadHeaders = {
      Authorization: sessionStorage.getItem("token"),
    };
  },
  head(){
    return{
      title: '我的资料 - Aiva博客'
    }
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang='less' scoped>
.info_item {
  display: flex;
  .change {
    color: #1890ff;
    cursor: pointer;
    margin-left: 10px;
  }
  .avatar-uploader > .ant-upload {
    width: 60px;
    height: 60px;
  }
}
</style>