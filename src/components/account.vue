<template>
    <div>
      <h3>这是account组件</h3>

      <div>
        <ul>
          <router-link to="/account/login/20" tag="li" active-class="active">
            <a href="">登入</a>
          </router-link>
          <router-link to="/account/register/10" tag="li" active-class="active">
            <a href="">注册</a>
          </router-link>
        </ul>
      </div>
      <div>
        <transition enter-active-class="animated bounceIn"
                    leave-active-class="animated bounceOut" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
</template>

<script>
  import login from "./login";
  import register from "./register";

    export default {
        name: "account",
        data(){
            return{

            }
        },
        methods:{},
        components: {
            'login': login,
            'register': register
        }
    }
</script>

<style scoped>
  .active{
    background-color: blue;
    font-size: 30px;
  }
  .v-enter,
  .v-leave-to{
    opacity: 0;
    transform: translateX(140px);
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }
</style>
