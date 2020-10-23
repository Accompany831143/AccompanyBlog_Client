<template>
  <div>
    <a-form :labelCol="{ span: 2}" :wrapperCol="{span:5,offset:1}">
      <a-form-item
        class="info_item"
        v-for="item in userInfo"
        :key="item.type"
        :label="item.label"
      >
        <div v-if="item.type === 'avatar'">
          <img :src="item.value" width="50" height="50" style="border-radius:50%;" alt="用户头像">
          <a-icon class="change" type="edit" />
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
        <a-button style="margin-left:20px;">重置</a-button>
      </a-form-item>
    </a-form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: [
        {
          type: "avatar",
          value: "https://upload.jianshu.io/users/upload_avatars/20584634/dd262f9e-0e9a-4e8c-844a-d987ada4851a.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120",
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
  methods:{
  },
  created() {},
};
</script>

<style lang='less'>
.info_item {
  display: flex;
  .change {
    color:#1890ff;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>