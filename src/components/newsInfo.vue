<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
      <span>点击：{{newsInfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsInfo.content"></div>

    <comment-box :parentID="this.id"></comment-box>
  </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import comment from "./comment";

    export default {
        name: "newsInfo",
        data() {
            return {
                id: this.$route.params.id,
                newsInfo:[]
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo(){
                this.$http.get('api/getnew/'+this.id).then(result=>{
                    if (result.body.status === 0){
                        this.newsInfo = result.body.message[0]
                    }else {
                        Toast('获取失败')
                    }
                })
            }
        },
        components:{
            'comment-box':comment
        }
    }
</script>

<style scoped>
  .newsinfo-container {
    padding: 0 6px;
  }
  .title{
    font-size: 16px;
    padding: 10px 0px;
    text-align: center;
    color: red;
  }
  .subtitle{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content img{
    width: 100%;
    height: 100%;
  }
</style>
