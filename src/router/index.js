import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import DashboardPage from '../components/Pages/DashboardPage.vue'
import AllOrders from '../components/AllOrders.vue'
import Summary from '../components/Summary.vue'
import AddProduct from '../components/Forms/AddProduct.vue'
import EditProduct from '../components/Forms/EditProduct.vue'
import ProfileForm from '../components/Forms/ProfileForm.vue'
import CouponForm from '../components/Forms/CouponForm.vue'
import EditCouponForm from '../components/Forms/EditCouponForm.vue'
import AllCoupons from '../components/Coupons/AllCoupons.vue'
import AddCategories from '../components/Forms/AddCategories.vue'
import AllCategories from '../components/Category/AllCategories.vue'
import EditCategory from '../components/Forms/EditCategory.vue'
import ErrorPage from '../components/Others/ErrorPage.vue'
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
    redirect: { name: 'DashboardPage' },
      children:[
        {
          path:'dashboard',
          name:'DashboardPage',
          component:DashboardPage
        },
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
          path:'editproduct/:id',
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
        {
          path:'profile',
          name:'ProfileForm',
          component:ProfileForm
        },
        {
          path:'addcoupon',
          name:'CouponForm',
          component:CouponForm
        },
        {
          path:'editcoupon/:id',
          name:'EditCouponForm',
          component:EditCouponForm
        },
        {
          path:'allcoupons',
          name:'AllCoupons',
          component:AllCoupons
        },
        {
          path:'addcategory',
          name:'AddCategories',
          component:AddCategories
        },
        {
          path:'editcategory/:id',
          name:'EditCategory',
          component:EditCategory
        },
        {
          path:'allcategories',
          name:'AllCategories',
          component:AllCategories
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
