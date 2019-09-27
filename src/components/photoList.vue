<template>
  <div>

    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper
        mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id==0?'mui-active':'']"
             v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link :to="'/home/photoInfo/'+item.id" v-for="item in list" :key="item.id" tag="li">
        <img v-lazy="item.img_url">  <!--在v-lazy里添加的是图片的路径-->
        <div class="info">
          <h4>{{item.title}}</h4>
          <h5>{{item.zhaiyao}}</h5>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import mui from '../../lib/mui/js/mui.min'  //导入mui的js文件

    export default {
        name: "photoList",
        data() {
            return {
                cates: [],  //顶部滑动栏的数组
                list: [],  //图片列表的数组
            }
        },
        created() {
            this.getAllCategory();
            this.getPhotoList(0);   //默认一进入页面时，[全部]栏 id 就为0
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005  //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getPhotoList(cateId) {
                this.$http.get('api/getimages/' + cateId).then(result => {
                    if (result.body.status === 0) {
                        this.list = result.body.message;
                    } else {
                        Toast('连接失败')
                    }
                })
            },
            getAllCategory() {
                this.$http.get('api/getimgcategory').then(result => {
                    if (result.body.status === 0) {
                        result.body.message.unshift({title: '全部', id: 0});
                        this.cates = result.body.message;
                    } else {
                        Toast('连接失败')
                    }
                })
            }
        }
    }
</script>

<style scoped>
  * {
    touch-action: pan-y;
  }

  .photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
  }
  .photo-list li{
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
  }
  .photo-list li img{
    width: 100%;
    vertical-align: middle;  /*垂直对齐*/

  }
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }

  .info{
    text-align: left;
    background-color: rgba(0,0,0,0.4);
    position: absolute;
    bottom: 0;
    max-height: 100px;
  }

  .info h4{
    font-size: 14px;
    color: #fff;
  }
  .info h5{
    font-size: 13px;
    color: #fff;
    line-height: 20px;
  }
</style>
