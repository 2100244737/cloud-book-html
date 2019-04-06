import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: 'index',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/index')
        },
        {
          path: 'person',
          name: 'person',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/person')
        }
      ]
    },
    {
      path: '/details/:id',
      name: 'details',
      meta: {
        title: '书籍详情'
      },
      component: () => import('@/views/details')
    },
    {
      path: '/titles/:id',
      name: 'titles',
      meta: {
        title: '书籍目录'
      },
      component: () => import('@/views/titles')
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: {
        title: '文章详情'
      },
      component: () => import('@/views/article')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/login')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: () => import('@/views/register')
    }
  ]
})
router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  next()
})
export default router
