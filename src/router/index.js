import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingVue from '../views/LandingVue.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path : '/landing',
      name : 'landing',
      component: LandingVue
    }
  ]
})

router.beforeEach((to, from) => {
  if(to.name === 'login'){
    return true
  }
  if(!localStorage.getItem('token')){
    return {
      name : 'login'
    }
  }

  checkTokenAuth()
})

const checkTokenAuth = () => {
  axios.get('http://127.0.0.1:8000/api/user', {
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => {})
  .catch((error) => {
    localStorage.removeItem('token')
    router.push({
      name : 'login'
    })
  })
}
export default router
