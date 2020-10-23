<template>
  <div class="menu_item boxShadowBase">
    <p><i></i><span>{{title}}</span></p>
    <ul>
      <li
        v-for="(item,index) in renderData"
        :key="item.id"
      >
        <a-tooltip placement="left">
          <template slot="title">{{ item.title }}</template
          ><a :class="{'linkColor':true,'primaryColor':index === active}" @click="activeItem(index)" href="javascript:;">{{ item.title }}</a>
        </a-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        renderData:Array
    },
    data() {
      return {
        active:0
      }
    },
    methods:{
      activeItem(index) {
        this.active = index
        this.$emit('on-change',this.renderData[index])
      }
    }
};
</script>

<style lang="less">
.menu_item {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 40px;
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
</style>