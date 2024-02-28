import { createRouter, createWebHistory } from 'vue-router'

import MapPage from '../views/MapPage.vue'
import AllRecordsPage from '../views/AllRecordsPage.vue'
import CollectionsPage from '../views/CollectionsPage.vue'
import CollectionRecordsPage from '../views/CollectionRecordsPage.vue'
import FavouritesPage from '../views/FavouritesPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ErrorPage from '../views/ErrorPage.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/collections', // Redirect from root path to /map
    },
    {
      path: '/map',
      name: 'map',
      component: MapPage,
      meta: { position: 4 },
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
      meta: { position: 1 },
    },
    {
      path: '/collections/:collection',
      name: 'collectionrecords',
      component: CollectionRecordsPage,
      meta: { position: 1 },
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritesPage,
      meta: { position: 3 },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { position: 5 },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue')
    },
    {
      path: "/:pathMatch(.*)",
      component: ErrorPage,
    }
  ]
})

router.afterEach((to, from) => {
  const toPos = to.meta.position
  const fromPos = from.meta.position
  if (!fromPos || !toPos) { return }

  if (toPos === fromPos) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length

    if (fromDepth === toDepth) { return }

    to.meta.transition = toDepth < fromDepth ? 'slide-out' : 'slide-in'
  }
  else {
    to.meta.transition = toPos < fromPos ? 'slide-right' : 'slide-left'
  }
})

export default router
