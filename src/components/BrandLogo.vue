<script setup lang="ts">
withDefaults(defineProps<{ inverse?: boolean }>(), { inverse: false })

/*
 * Brand mark. Drop the official artwork into src/assets/brand/ and it is picked up
 * automatically (hashed, cached and optimised by Vite):
 *   - logo-mark.png  the "GCC" monogram on its own (used here)
 * Until it exists, a drawn fallback mark in the brand colours is shown.
 */
const marks = import.meta.glob<string>('@/assets/brand/logo-mark.{png,webp,svg}', {
  eager: true,
  import: 'default',
})
const markSrc = Object.values(marks)[0]
</script>

<template>
  <span class="brand" :class="{ 'brand--inverse': inverse }">
    <img
      v-if="markSrc"
      :src="markSrc"
      alt=""
      class="brand__mark brand__mark--img"
      width="96"
      height="40"
    />
    <svg v-else class="brand__mark" viewBox="0 0 64 64" width="44" height="44" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0c1d42" />
      <text
        x="32"
        y="46"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="42"
        font-weight="700"
        fill="#fff"
      >
        G
      </text>
      <path
        d="M12 44c10 4 26 3 40-8"
        fill="none"
        stroke="#d4a33b"
        stroke-width="3.5"
        stroke-linecap="round"
      />
    </svg>
    <span class="brand__divider" aria-hidden="true"></span>
    <span class="brand__text">
      <span class="brand__name">GYANG</span>
      <span class="brand__sub">Corporate Consult</span>
    </span>
  </span>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--navy-900);
}

.brand--inverse {
  color: #fff;
}

.brand__mark {
  flex-shrink: 0;
}

.brand__mark--img {
  width: auto;
  height: 40px;
  object-fit: contain;
}

/* The monogram is navy on transparent: give it a light tile on dark backgrounds. */
.brand--inverse .brand__mark--img {
  box-sizing: content-box;
  background: #fff;
  border-radius: 8px;
  padding: 4px 6px;
}

.brand__divider {
  align-self: stretch;
  width: 2px;
  margin-block: 2px;
  background: var(--gold-700);
}

.brand--inverse .brand__divider {
  background: var(--gold-400);
}

.brand__text {
  display: grid;
  line-height: 1.05;
}

.brand__name {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.brand__sub {
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-700);
}

.brand--inverse .brand__sub {
  color: var(--gold-400);
}
</style>
