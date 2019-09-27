<template>
    <div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
          <router-link :to="'/home/newsInfo/'+item.id">
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
              <p style="font-size: 14px">{{item.title}}</p>
              <p class='mui-ellipsis'>
                <span>发表时间：{{item.add_time | dateFormat}}</span>
                <span>点击：{{item.click}}次</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
    export default {
        name: "newslist",
        data(){
            return{
                newslist:[],
            }
        },
        created(){
          this.getlist()
        },
        methods:{
            getlist(){
                this.$http.get('api/getnewslist').then(result=>{
                    if(result.body.status === 0){
                        this.newslist = result.body.message
                    }else {
                        Toast('连接失败')
                    }
                })
            }
        }
    }
</script>

<style scoped>
.mui-ellipsis{
  color: #226aff;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
