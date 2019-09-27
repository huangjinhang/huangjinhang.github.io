<template>
  <div class="goods-list">

    <!--在网页中，有两种跳转方式-->
    <!--方式1：使用 a 标签的形式 叫做标签跳转 （router-link）属于这种-->
    <!--方式2：使用 window.location.href的形式 叫做 编程式导航-->
    <!--    <router-link :to="'/home/goodsInfo/' + item.id" tag="div"-->
    <!--                 class="goods-item" v-for="item in goodslist" :key="item.id">-->
    <!--      <img :src="item.img_url" alt="">-->
    <!--      <h4 class="title">{{item.title}}</h4>-->
    <!--      <div class="info">-->
    <!--        <p class="price">-->
    <!--          <span class="now">￥{{item.sell_price}}</span>-->
    <!--          <span class="old">￥{{item.market_price}}</span>-->
    <!--        </p>-->
    <!--        <p class="sell">-->
    <!--          <span>热卖中</span>-->
    <!--          <span>剩余{{item.stock_quantity}}件</span>-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </router-link>-->

    <div class="goods-item" v-for="item in goodslist" :key="item.id"
         @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h4 class="title">{{item.title}}</h4>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="more">加载更多</mt-button>
  </div>
</template>

<script>

    export default {
        name: "goodsList",
        data() {
            return {
                pageIndex: 1,
                goodslist: []
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                })
            },
            more() {
                this.pageIndex++;
                this.getGoodsList();
            },
            goDetail(id) {

                //this.$route 和 this.$router的区别
                //this.$route 是路由的参数对象，所有路由中的参数，params,query都属于它
                //this.$router 是一个路由导航对象，用它可以方便的 使用js代码，实现路由的前进，后退，跳转新的URL地址等
                console.log(this)
                // this.$router.push("/home/goodsInfo/" + id);  //方法一 最简单的
                // this.$router.push({path:"/home/goodsInfo/" + id});  //方法二 传递对象
                this.$router.push({name: 'goodsinfo', params: {id}});  //方法三 传递命名的路由
            }
        }
    }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 6px;
    justify-content: space-between;
  }

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
  }

  .goods-item img {
    width: 100%;
  }

  .title {
    font-size: 14px;
  }

  .info {
    background-color: #eee;
  }

  .info p {
    margin: 0;
    padding: 5px;
  }

  .now {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }

  .old {
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
  }

  .sell {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
</style>
