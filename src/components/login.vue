<template>
  <div>
    <h3>{{title}}---{{this.$route.params.num}}</h3>
    <ul class="login">
      <li v-for="(data,index) in list">
        {{data}}
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                title: '我是登入页面',
                list: [
                    '1111', '2222', '3333'
                ],
            }
        },
        methods: {},
    }
</script>

<style scoped>
.login li{
  display: block;
}
</style>
