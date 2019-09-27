<template>
  <div>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in parentList" :key="item.id">
        <img :src="item.img" alt="" :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    export default {
        name: "slideshow",
        data() {
            return {

            }
        },
        props:["parentList","isfull"],
        methods: {

        }
    }
</script>

<style scoped>
  .mint-swipe {
    height: 200px;
  }
  .mint-swipe-item{
    text-align: center;
  }
  .mint-swipe-item img {
    /*width: 100%;*/
    height: 100%;
  }

  .full{
    width: 100%;
  }
</style>
