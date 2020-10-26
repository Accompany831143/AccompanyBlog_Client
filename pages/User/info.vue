<template>
  <div>
    <a-form :labelCol="{ span: 2 }" :wrapperCol="{ span: 5, offset: 1 }">
      <a-form-item
        class="info_item"
        v-for="item in userInfo"
        :key="item.type"
        :label="item.label"
      >
        <div v-if="item.type === 'avatar'">
          <!-- <img
            :src="item.value"
            width="50"
            height="50"
            style="border-radius: 50%"
            alt="用户头像"
          /> -->
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="用户头像" />
          </a-upload>
        </div>
        <div v-if="item.type === 'sex'">
          <a-radio-group v-model="item.value" :default-value="1">
            <a-radio :value="'0'"> 男 </a-radio>
            <a-radio :value="'1'"> 女 </a-radio>
          </a-radio-group>
        </div>
        <div v-if="item.type !== 'avatar' && item.type !== 'sex'">
          <a-input v-model="item.value" />
        </div>
      </a-form-item>
      <a-form-item label="">
        <a-button type="primary">提交</a-button>
        <a-button style="margin-left: 20px">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      imageUrl: "https://upload.jianshu.io/users/upload_avatars/20584634/dd262f9e-0e9a-4e8c-844a-d987ada4851a.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120",
      loading: false,
      userInfo: [
        {
          type: "avatar",
          value:
            "https://upload.jianshu.io/users/upload_avatars/20584634/dd262f9e-0e9a-4e8c-844a-d987ada4851a.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120",
          label: "头像",
          isEdit: false,
        },
        {
          type: "userName",
          value: "666",
          label: "用户名",
          isEdit: false,
        },
        {
          type: "phone",
          value: "18442312342",
          label: "联系方式",
          isEdit: false,
        },
        {
          type: "sex",
          value: "0",
          label: "性别",
          isEdit: false,
        },
      ],
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
  created() {},
};
</script>

<style lang='less'>
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