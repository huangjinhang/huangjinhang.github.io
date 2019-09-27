<template>
  <div>
    <cmt-box :parentID="id"></cmt-box>
  </div>
</template>

<script>
    import comment from "./comment";

    export default {
        name: "goodsComment",
        data(){
          return{
              id:this.$route.params.id,
          }
        },
        components: {
            'cmt-box': comment
        }
    }
</script>

<style scoped>

</style>
