<template>
  <div class="goodsInfo-container">

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!--商品轮播图区域-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <slideshow-box :parentList="lunbolist" :isfull="false"></slideshow-box>
        </div>
      </div>
    </div>
    <!--商品购买区域-->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;
            销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
      <!--<div class="mui-card-footer">页脚</div>-->
    </div>
    <!--商品参数区域-->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：剩余 {{goodsInfo.stock_quantity}} 件</p>
          <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
    import slideshow from "./slideshow";
    import goodsInfo_numbox from "./goodsInfo_numbox";

    export default {
        name: "goodsInfo",
        data() {
            return {
                id: this.$route.params.id, //将路由参数对象中的id挂载到data，方便后期调用
                goodsInfo: {},  //轮播图的数据
                lunbolist: [],  //获取到的商品信息
                ballFlag: false,  //控制小球的隐藏和显示的标识符
                selectedCount: 1
            }
        },
        created() {
            this.getlunboList();
            this.getGoodsInfo()
        },
        methods: {
            getlunboList() {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        })
                        this.lunbolist = result.body.message
                    }
                })
            },
            getGoodsInfo() {
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodsInfo = result.body.message[0]
                    }
                })
            },
            goDesc(id) {
                this.$router.push({name: 'goodsDesc', params: {id}});
            },
            goComment(id) {
                this.$router.push({name: 'goodsComment', params: {id}});
            },
            addToShopCar() {
                this.ballFlag = !this.ballFlag;
                let goodsinfo = {
                    id: this.id, count: this.selectedCount,
                    price: this.goodsInfo.sell_price, selected: true
                }
                //调用store 中 mutations的方法来将商品加入购物车
                this.$store.commit('addToCar',goodsinfo)
            },
            beforeEnter(el) {
                el.style.transform = "translate(0,0)";
            },
            enter(el, done) {
                el.offsetWidth;

                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePosition = document.getElementById('badge').getBoundingClientRect();
                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = 'translate(${xDist}px,${yDist}px)';
                el.style.transition = 'all 10s ease';
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count) {
                this.selectedCount = count;
                console.log(this.selectedCount)
            }
        },
        components: {
            'slideshow-box': slideshow,
            'numbox': goodsInfo_numbox
        }
    }
</script>

<style lang="scss" scoped>
  .goodsInfo-container {
    background-color: #eee;
    overflow: hidden;

    .now_price {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }

    .mui-card-footer {
      display: block;

      button {
        margin: 15px 0;
      }
    }


  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    z-index: 999;
    position: absolute;
    top: 388px;
    left: 148px;
  }

</style>
