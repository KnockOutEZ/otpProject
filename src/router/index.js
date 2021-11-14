import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AllOrders from '../components/AllOrders.vue'
import Summary from '../components/Summary.vue'
import axios from 'axios'

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
      beforeEnter:(to,from,next)=>{
        axios.get(process.env.VUE_APP_API_URL + 'auth/get-me',{withCredentials:true})
        .then((res) => {
          console.log(res)
          this.$routes.push('Home');
      }).catch((error) => {
        console.log(error)
        this.$routes.push('AllOrders');
        next()
    })
      },
    redirect: { name: 'AllOrders' },
      children:[
        {
          path:'allorders',
          name:'AllOrders',
          component:AllOrders
        },
        {
          path:'summary',
          name:'Summary',
          component:Summary
        },
      ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router
