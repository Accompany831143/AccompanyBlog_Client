<template>
  <div class="collection">
    <a-list size="large" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <nuxt-link to="">{{ item }}</nuxt-link>
        
      </a-list-item>
      
    </a-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        "Racing car sprays burning fuel into crowd.",
        "Japanese princess to wed commoner.",
        "Australian walks 100km after outback crash.",
        "Man charged over missing wedding girl.",
        "Los Angeles battles huge wildfires.",
      ],
    };
  },
};
</script>

<style lang='less'>
</style>