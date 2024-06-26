import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Landing from '../views/Landing.vue'
import Location from '../views/Location.vue'
import Map from '../views/Map.vue'
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
      component: Landing
    },
    {
      path : '/location',
      name : 'location',
      component : Location
    },
    {
      path : '/map',
      name : 'map',
      component : Map
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
