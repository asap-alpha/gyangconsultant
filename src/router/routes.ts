import type { RouteRecordRaw } from 'vue-router'
import { findService } from '@/content/services'
import HomeView from '@/views/HomeView.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/services', name: 'services', component: () => import('@/views/ServicesView.vue') },
  {
    path: '/services/:slug',
    name: 'service',
    component: () => import('@/views/ServiceDetailView.vue'),
    props: true,
    beforeEnter: (to) =>
      findService(String(to.params.slug))
        ? true
        : { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } },
  },
  { path: '/clients', name: 'clients', component: () => import('@/views/ClientsView.vue') },
  { path: '/approach', name: 'approach', component: () => import('@/views/ApproachView.vue') },
  {
    path: '/partnerships',
    name: 'partnerships',
    component: () => import('@/views/PartnershipsView.vue'),
  },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

export const mainNav = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/clients', label: 'Who We Serve' },
  { to: '/approach', label: 'Our Approach' },
  { to: '/partnerships', label: 'Partnerships' },
] as const
