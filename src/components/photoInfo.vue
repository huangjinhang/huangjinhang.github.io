<template>
  <div>
    <h3 class="photoHeader">{{photoMsg.title}}</h3>
    <div class="photoBody">
      <span>发表时间：{{photoMsg.add_time | dateFormat}}</span>
      <span>点击：{{photoMsg.click}}次</span>
    </div>
    <hr>
    <!--缩略图模块-->
    <div class="thumbs">
      <ul>
        <li v-for="(item,index) in photolist">
          <img v-preview="item.src" :src="item.src"
          preview-title-enable="true" preview-nav-enable="true">
        </li>
      </ul>

<!--      <img class="preview-img" v-for="(item,index) in photolist" :src="item.src"-->
<!--      height="100" @click="$preview.open(index,photolist)" :key="item.src">-->
    </div>

    <!--内容模块-->
    <div class="photoContent" v-html="photoMsg.content"></div>

    <!--评论模块-->
    <comment_box :parentID="this.id"></comment_box>
  </div>
</template>

<script>
  import comment from "./comment";

    export default {
        name: "photoInfo",
        data() {
            return {
                id: this.$route.params.id,
                photoMsg: {},
                photolist:[]  //缩略图数组
            }
        },
        created() {
            this.getphotoMsg();
            this.getThumbs();
        },
        methods: {
            getThumbs(){
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        //循环每个图片的数据，补全图片的宽高
                        result.body.message.forEach(item=>{
                            item.w = 600;
                            item.h = 400;
                        })
                        //把完整的数据保存到 photolist 中去
                        this.photolist = result.body.message
                    }
                })
            },
            getphotoMsg() {
                this.$http.get('api/getimageInfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.photoMsg = result.body.message[0]
                    }
                })
            }
        },
        components:{
            'comment_box':comment
        }
    }
</script>

<style scoped>
  .photoHeader {
    color: #226aff;
    font-size: 16px;
    text-align: center;
    margin: 15px;
  }

  .photoBody {
    font-size: 13px;
    color: grey;
    display: flex;
    justify-content: space-between;
  }

  .photoContent{
    font-size: 14px;
    line-height: 25px;
  }

  .thumbs img{
    margin: 10px;
    box-shadow: 0 0 8px #999;
    width: 100px;
    height: 100px;
  }
  .thumbs ul{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

</style>
