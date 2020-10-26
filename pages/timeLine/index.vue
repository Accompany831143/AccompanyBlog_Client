<template>
  <div class="timeLine">
    <div class="container">
      <a-timeline mode="left" reverse>
        <a-timeline-item
          color="#d0344e"
          v-for="(item, index) in 10"
          :key="index"
        >
          <div class="timeLineBox">
            <a-tag class="dateTag" color="green">2020-12-21 星期三 21:23:15</a-tag>
            <article-info />
          </div>
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script>
import ArticleInfo from "@/components/ArticleInfo.vue";
export default {
  layout: "container",
  data() {
    return {};
  },
  components: {
    ArticleInfo,
  },
};
</script>

<style lang='less' scoped>
.timeLine {
  // background-color: #fff;
  padding-top: 100px;
  min-height: calc(100vh - 40px);
  .container {
    width: 740px;
  }
  .timeLineBox {
    width: 700px;
    margin-left:20px;
    .dateTag {
      margin-bottom:20px;
    }
  }
}
</style>