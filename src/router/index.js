import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/1_main_page/MainPage'
import Posting from '@/components/2_posting/Posting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/postings/:posting',
      name: 'Posting',
      component: Posting
    }
  ]
})
