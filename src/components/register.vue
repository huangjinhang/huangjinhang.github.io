<template>

  <div>
    <h3>{{title}}---{{this.$route.params.num}}</h3>
    <ul class="res">
      <li v-for="(data,index) in list">
        {{data}}
      </li>
    </ul>
  </div>

</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                title: '我是注册页面',
                list: [
                    '4444', '5555', '6666'
                ]
            }
        },
        methods: {},
    }
</script>

<style scoped>
  .res li {
    display: block;
  }
</style>
