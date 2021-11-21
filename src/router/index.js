import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AllOrders from '../components/AllOrders.vue'
import Summary from '../components/Summary.vue'
import AddProduct from '../components/AddProduct.vue'
import EditProduct from '../components/EditProduct.vue'
import ErrorPage from '../components/ErrorPage.vue'
import Analytics from '../components/Analytics/Analytics.vue'
import Notifications from '../components/Others/Notifications.vue'

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
        {
          path:'addproduct',
          name:'AddProduct',
          component:AddProduct
        },
        {
          path:'editproduct',
          name:'EditProduct',
          component:EditProduct
        },
        {
          path:'analytics',
          name:'Analytics',
          component:Analytics
        },
        {
          path:'notifications',
          name:'Notifications',
          component:Notifications
        },
      ]
  },
  {
    path:'/404',
          name:'ErrorPage',
          component:ErrorPage
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { path: '/404' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router
