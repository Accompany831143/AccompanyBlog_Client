<template>
  <div class="userInfo">
    <div class="container">
      <a-row>
        <a-col :span="6">
          <leftMenu :renderData="leftMenuData" @on-change="changeTab" title="我的资料" />
        </a-col>
        <a-col :span="17" offset="1">
          <div class="infoBox boxShadowBase">
            <h3>{{activeTitle}}</h3>
            <nuxt-child/>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import leftMenu from '@/components/rightList.vue'
export default {
  layout:'container',
  data() {
    return {
      activeTitle:'我的收藏',
      leftMenuData:[
        {
          id:1,
          title:'我的收藏',
          path:'/user'
        },
        {
          id:2,
          title:'资料设置',
          path:'/user/info'
        },
        
      ]
    };
  },
  components:{
    leftMenu
  },
  methods:{
    changeTab(router) {
      this.activeTitle = router.title
      this.$router.push(router.path)
    }
  }
};
</script>

<style lang='less'>
.userInfo {
  min-height:calc(100vh - 40px);
  padding-top: 80px;
  padding-bottom: 40px;
  .infoBox {
    background-color: #fff;
    min-height:calc(100vh - 160px);
    padding:16px 26px;
    &>h3 {
      margin-bottom: 16px;
    }
  }
}
</style>