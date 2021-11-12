import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AllOrders from '../components/AllOrders.vue'

const routes = [
  {
    path: '/login',
    name: 'Home',
    component: Home,
  },
    {
      path:'',
      name:'Dashboard',
      component:Dashboard,
      // beforeEnter:(to,from,next)=>{
      //   if(localStorage.getItem("accessToken") === null){
      //     this.$routes.push('Home');
      //   }
      //   else{
      //     next()
      //   }
      // },
    redirect: { name: 'AllOrders' },
      children:[
        {
          path:'allorders',
          name:'AllOrders',
          component:AllOrders
        },
      ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
