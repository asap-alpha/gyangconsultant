<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { mainNav } from '@/router/routes'
import { contact } from '@/content/site'
import AppIcon from './AppIcon.vue'
import BrandLogo from './BrandLogo.vue'

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`

function close(returnFocus = false) {
  if (!open.value) return
  open.value = false
  if (returnFocus) nextTick(() => toggle.value?.focus())
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close(true)
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

watch(
  () => route.fullPath,
  () => close(),
)

watch(open, (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="container site-header__inner">
      <RouterLink to="/" class="site-header__brand" aria-label="Gyang Corporate Consult — home">
        <BrandLogo />
      </RouterLink>

      <button
        ref="toggle"
        class="site-header__toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="primary-nav"
        @click="open = !open"
      >
        <AppIcon :name="open ? 'close' : 'menu'" />
        <span class="visually-hidden">{{ open ? 'Close menu' : 'Open menu' }}</span>
      </button>

      <nav id="primary-nav" class="site-nav" aria-label="Main">
        <ul class="site-nav__list">
          <li v-for="item in mainNav" :key="item.to">
            <RouterLink :to="item.to" class="site-nav__link">{{ item.label }}</RouterLink>
          </li>
        </ul>
        <RouterLink to="/contact" class="btn btn--dark site-nav__cta">Contact Us</RouterLink>
        <ul
          v-if="contact.email || contact.phones.length || contact.address"
          class="site-nav__contact"
          aria-label="Contact details"
        >
          <li v-if="contact.email">
            <AppIcon name="mail" :size="18" />
            <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          </li>
          <li v-for="p in contact.phones" :key="p">
            <AppIcon name="phone" :size="18" />
            <a :href="telHref(p)">{{ p }}</a>
          </li>
          <li v-if="contact.address">
            <AppIcon name="mapPin" :size="18" />
            <span>{{ contact.address }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(255 255 255 / 0.96);
  border-bottom: 1px solid transparent;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

@supports (backdrop-filter: blur(8px)) {
  .site-header {
    background: rgb(255 255 255 / 0.88);
    backdrop-filter: saturate(1.4) blur(10px);
  }
}

.site-header.is-scrolled {
  border-color: var(--line);
  box-shadow: 0 4px 18px rgb(12 29 66 / 0.06);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: var(--header-h);
}

.site-header__brand {
  text-decoration: none;
  border-radius: 8px;
}

.site-header__toggle {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  color: var(--navy-900);
  cursor: pointer;
}

.site-nav {
  display: none;
}

.site-nav__list {
  list-style: none;
}

.site-nav__link {
  display: block;
  font-weight: 550;
  color: var(--ink);
  text-decoration: none;
  padding: 0.6rem 0.2rem;
  border-radius: 6px;
}

.site-nav__link:hover,
.site-nav__link.router-link-active {
  color: var(--gold-700);
}

.site-nav__link.router-link-active {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 8px;
}

/* Mobile drawer */
@media (max-width: 959.98px) {
  /* backdrop-filter makes the header the containing block for the fixed drawer, collapsing it */
  .site-header.is-open {
    background: var(--surface);
    backdrop-filter: none;
  }

  .is-open .site-nav {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: fixed;
    inset: var(--header-h) 0 0;
    padding: 1.5rem clamp(1rem, 4vw, 2rem) 2rem;
    background: var(--surface);
    border-top: 1px solid var(--line);
    overflow-y: auto;
  }

  .site-nav__list {
    display: grid;
  }

  .site-nav__link {
    font-size: var(--step-1);
    padding-block: 0.85rem;
    border-bottom: 1px solid var(--line);
  }

  .site-nav__link.router-link-active {
    text-decoration: none;
  }

  .site-nav__contact {
    list-style: none;
    display: grid;
    gap: 0.9rem;
    color: var(--ink);
  }

  .site-nav__contact li {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
  }

  .site-nav__contact :deep(svg) {
    flex-shrink: 0;
    margin-top: 0.2em;
    color: var(--gold-700);
  }

  .site-nav__contact a {
    color: var(--navy-900);
    font-weight: 550;
    overflow-wrap: anywhere;
  }
}

@media (min-width: 960px) {
  .site-header__toggle {
    display: none;
  }

  .site-nav {
    display: flex;
    align-items: center;
    gap: 1.75rem;
  }

  .site-nav__list {
    display: flex;
    gap: 1.5rem;
  }

  .site-nav__cta {
    min-height: 44px;
    padding-block: 0.55rem;
  }

  .site-nav__contact {
    display: none;
  }
}
</style>
