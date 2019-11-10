import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    meta: {
      auth: true,
    },
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

// 全局守卫
router.beforeEach((to, from, next) => {
  // 验证是否登陆过
  if (to.meta.auth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          direct: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
