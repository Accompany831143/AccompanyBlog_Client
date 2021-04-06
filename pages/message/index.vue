<template>
  <div class="message">
    <div class="container">
      <div class="form">
        <div class="article_comments">
          <p style="margin-bottom: 20px"><b>留言板</b></p>
          <div class="formContent">
            <div>
              <a-textarea
                :maxLength="500"
                allowClear
                v-model="content"
                placeholder="请输入内容"
                :rows="6"
              />
            </div>
            <div style="margin-top: 20px; text-align: right">
              <a-button style="background: #d0344e; color: #fff" @click="submit"
                >发表</a-button
              >
            </div>
          </div>
          <div class="commentContent">
            <a-comment v-for="item in messageList" :key="item.uuid">
              <a slot="author">{{ item.userName }}</a>
              <a-avatar slot="avatar" :src="item.userAvatar" alt="用户01" />
              <p slot="content">{{ item.content }}</p>
              <a-tooltip slot="datetime" title="2020-10-21">
                <span>{{ item.releaseTime }}</span>
              </a-tooltip>
            </a-comment>
          </div>
          <div style="text-align: center" v-if="pageInfo.total">
                <a-pagination
                  :default-current="1"
                  :total="this.pageInfo.total"
                  @change="changePage"
                />
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { months } from "moment";
export default {
  layout: "container",
  data() {
    return {
      content: "",
      messageList: [],
      pageInfo:{
        total:0,
        current:1
      }
    };
  },
  methods: {
    submit() {
      let token = sessionStorage.getItem("token");
      if (token) {
        if (this.content === "") {
          this.$message.warn("请输入内容！");
        } else {
          this.$axios({
            url: "/message/add",
            method: "post",
            data: {
              content: this.content,
              releaseTime: new Date().getTime(),
            },
          }).then((res) => {
            this.content = "";
            this.$message.success("发表成功，审核通过后展示！");
            this.getMessageList();
          });
        }
      } else {
        this.$message.warn("您还没有登录！");
      }
    },
    getMessageList() {
      this.$axios({
        url: "/message/latest",
        params: {
          page:this.pageInfo.current
        },
      }).then((res) => {
        res.body.result = res.body.result.map((item) => {
          item.userAvatar = item.userAvatar;
          item.releaseTime = this.$Moment(new Date(item.releaseTime)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          return item;
        });
        this.messageList = res.body.result;
        this.pageInfo = res.body.pageInfo;
      });
    },
    changePage(page) {
      this.pageInfo.current = page
      this.getMessageList()
    }
  },
  created() {
    this.getMessageList();
  },
  head() {
    return {
      title: "留言板 - Aiva博客",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Aiva博客的留言板",
        },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
.message {
  min-height: calc(100vh - 40px);
  padding-top: 115px;
  padding-bottom: 20px;
  background-color: #fff;
}
</style>