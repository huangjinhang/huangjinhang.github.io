<template>
  <div id="app">

    <!--头部模块-->
    <div>
      <mt-header fixed title="VUE练习" style="z-index: 99">
        <span slot="left" @click="goBack" v-show="flag">
          <mt-button icon="back"></mt-button>
        </span>
      </mt-header>
    </div>

    <!--主题模块-->
    <div>
      <transition>
          <router-view></router-view>
      </transition>
      <lg-preview></lg-preview>
    </div>

    <!--底栏模块-->
    <div>
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item-hjh" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item-hjh" to="/members">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item-hjh" to="/shopcart">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-hjh" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
    </div>

  </div>
</template>

<script>
    import account from "./components/account";


    export default {
        name: 'App',
        data() {
            return {flag:false}
        },
        created(){
            this.flag = this.$route.path === '/home'? false:true
        },
        methods: {
            goBack(){  //点击后退
                this.$router.go(-1)
            }
        },
        watch:{
            '$route.path':function (newVal) {
                if (newVal === '/home'){
                    this.flag = false
                }else {
                    this.flag = true
                }
            }
        },
        components: {
            'account':account
        }
    }
</script>

<style>
#app{
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

  .v-enter{
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active{
    transition: all 0.3s ease;
  }

  .mui-bar-tab .mui-tab-item-hjh .mui-active{
    color: #007aff;
  }

  .mui-bar-tab .mui-tab-item-hjh{
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }
.mui-bar-tab .mui-tab-item-hjh .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-hjh .mui-icon~.mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
