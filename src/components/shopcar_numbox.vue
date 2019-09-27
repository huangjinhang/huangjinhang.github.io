<template>

  <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount"
           @change="countChanged" ref="numbox" readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'

    export default {
        name: "goodsInfo_numbox",
        data(){
            return{}
        },
        mounted(){
            //初始化数字选择框组件
            mui(".mui-numbox").numbox();
        },
        methods:{
            countChanged(){
                // console.log(this.$refs.numbox.value);
                //每当数量发生改变，立即把最新的数量同步到购物车中的 store中，覆盖之前的数量
                this.$store.commit('updateGoodsInfo',
                    {id:this.goodsid,count:this.$refs.numbox.value})
            }
        },
        props:[
            'initcount','goodsid'
        ]
    }
</script>

<style scoped>

</style>
