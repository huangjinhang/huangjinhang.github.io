import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from "../components/login";
import register from "../components/register";
import account from "../components/account";
import home from "../components/home";
import members from "../components/members";
import shopcart from "../components/shopcart";
import search from "../components/search";
import newslist from "../components/newslist";
import newsInfo from "../components/newsInfo";
import photoList from "../components/photoList";
import photoInfo from "../components/photoInfo";
import goodsList from "../components/goodsList";
import goodsInfo from "../components/goodsInfo";
import goodsDesc from "../components/goodsDesc";
import goodsComment from "../components/goodsComment";

Vue.use(Router)

export default new Router({
  mode: 'history',//切换路径模式，变成history模式，也就是去掉#
  scrollBehavior: () => ({y: 0}),

  routes: [
    {path: '/home', component: home},
    {path: '/members', component: members},
    {path: '/shopcart', component: shopcart},
    {path: '/search', component: search},
    {path: '/home/newslist', component: newslist},
    {path: '/home/newsInfo/:id', component: newsInfo},
    {path: '/home/photoList', component: photoList},
    {path: '/home/photoInfo/:id', component: photoInfo},
    {path: '/home/goodsList', component: goodsList},
    {path: '/home/goodsInfo/:id', component: goodsInfo, name: 'goodsinfo'},
    {path: '/home/goodsDesc/:id', component: goodsDesc, name: 'goodsDesc'},
    {path: '/home/goodsComment/:id', component: goodsComment, name: 'goodsComment'},
    {path: '/', redirect: '/home'},   //设置默认指向

  ],
  linkActiveClass: 'mui-active'  //设置小图标的高亮
})
