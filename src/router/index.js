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
      redirect: '/collections',
    },{
      path: '/map',name: 'map',meta: { position: 4 },
      component: MapPage,
    },{
      path: '/allrecords', name: 'allrecords',meta: { position: 2 },
      component: AllRecordsPage,
    },{
      path: '/collections', name: 'collections', meta: { position: 1 },
      component: CollectionsPage,
    },{
      path: '/collections/:collection',name: 'collectionrecords',meta: { position: 1 },
      component: CollectionRecordsPage,
    },{
      path: '/favourites', name: 'favourites',meta: { position: 3 },
      component: FavouritesPage,
    },{
      path: '/about', name: 'about',meta: { position: 5 },
      component: AboutPage,
    },{
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
