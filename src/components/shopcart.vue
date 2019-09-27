<template>
  <div class="shopcar-container">

    <!--商品列表项目区域-->
    <div class="goods-list">
      <div class="mui-card"  v-for="(item,i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]"
                :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--结算区域-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，
              总价 ￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import shopcar_numbox from "./shopcar_numbox";
  import goodsList from "./goodsList";
    export default {
        name: "shopcart",
        data(){
            return{
                goodsList:[]  //购物车中所有商品的数据
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                //获取到 store 中car中所有商品的id，再用,拼接出一个字符串
                let idArr = [];
                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id)
                });
                if (idArr.length<=0){//如果购物车中没有商品，就直接返回，不要请求接口，不然会报错
                    return
                }
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
                    if (result.body.status === 0){
                        this.goodsList = result.body.message;
                    }
                })
            },
            remove(id,index){
                //点击删除，把商品从store中根据 id 删除
                //同时，把当前组件的 goodslist 中，对应要删除的哪个商品，使用index来删除
                this.goodsList.splice(index,1);
                this.$store.commit('removeFormCar',id)
            },
            selectedChanged(id,val){
                this.$store.commit('updateGoodsSelected',{id,selected:val})
            }
        },
        components:{
            'numbox':shopcar_numbox
        }
    }
</script>

<style lang="scss" scoped>
.shopcar-container{
  background-color: #eee;
  overflow: hidden;
  .goods-list{
    .mui-card-content-inner{
      display: flex;
      align-content: center;
    }
    img{
      width: 60px;
      height: 60px;
    }
    h1{
      font-size: 14px;
    }
    .info{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price{
        color: red;
        font-weight: bold;
      }
    }
  }

  .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;  //垂直居中

    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}


</style>
