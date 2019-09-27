import login from "../components/login";
import register from "../components/register";

export default [
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/register',
    name:'register',
    component:register
  },
  {path:'*',redirect:'/login'}//设置默认指向
]
