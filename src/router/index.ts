import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue';
import AdminView from '@/views/AdminView.vue';
import AdvertsView from '@/views/AdvertsView.vue';
import ShowAdvertiseView from '@/views/ShowAdvertiseView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task',
      component: TaskView
    },
    {
      path: '/adverts',
      name: 'adverts',
      component: AdvertsView
    },
    {
      path: '/adverts/:id',
      name: 'advert',
      component: ShowAdvertiseView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
  ]
})

export default router
