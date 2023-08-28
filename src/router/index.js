import { createRouter, createWebHistory } from 'vue-router'

import MapPage from '../views/MapPage.vue'
import AllRecordsPage from '../views/AllRecordsPage.vue'
import CollectionsPage from '../views/CollectionsPage.vue'
import CollectionRecordsPage from '../views/CollectionRecordsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'map',
      component: MapPage,
      meta: { position: 1 },
    },
    {
      path: '/allrecords',
      name: 'allrecords',
      component: AllRecordsPage,
      meta: { position: 2 },
    },
    /*{
      path: '/allrecords/:record?', if using the record as a path param instead of passing in querry
      name: 'allrecords',
      component: AllRecordsPage, 
    },
    /*{
      path: '/allrecords/:record',
      component: RecordPage,
    },*/
    {
      path: '/collections',
      name: 'collections',
      component: CollectionsPage,
      meta: { position: 3 },
    },
    {
      path: '/collections/:collection',
      name: 'collectionrecords',
      component: CollectionRecordsPage,
      meta: { position: 3 },
    },
    {
      path: '/about',
      name: 'about',
      meta: { position: 4 },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.afterEach((to, from) => {
  const toPos = to.meta.position
  const fromPos = from.meta.position
  if (toPos === fromPos) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transition = toDepth < fromDepth ? 'slide-out' : 'slide-in'
  }
  else {
    to.meta.transition = toPos < fromPos ? 'slide-right' : 'slide-left'
  }
  console.log(to)
  console.log(from)
  console.log(to.meta.transition)
})

export default router
