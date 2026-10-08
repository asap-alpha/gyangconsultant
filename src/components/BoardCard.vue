<script setup lang="ts">
import { computed } from 'vue'
import type { BoardMember } from '@/content/board'
import { initials, teamPhoto } from '@/composables/teamPhoto'

const props = defineProps<{ member: BoardMember }>()
const photo = computed(() => teamPhoto(props.member.slug))
const hasMore = computed(() => !!(props.member.bio?.length || props.member.qualifications?.length))
</script>

<template>
  <article class="card board-card" :aria-labelledby="`${member.slug}-name`">
    <div class="board-card__photo">
      <img
        v-if="photo"
        :src="photo.src"
        :srcset="photo.srcset"
        sizes="(min-width: 760px) 220px, 100vw"
        :alt="`Portrait of ${member.name}`"
        width="320"
        height="400"
        loading="lazy"
        decoding="async"
      />
      <span v-else class="board-card__initials" aria-hidden="true">{{
        initials(member.name)
      }}</span>
    </div>

    <div class="board-card__body">
      <p class="board-card__role">{{ member.role }}</p>
      <h3 :id="`${member.slug}-name`">{{ member.name }}</h3>
      <p v-if="member.title" class="board-card__title">{{ member.title }}</p>
      <p v-if="member.summary" class="board-card__summary">{{ member.summary }}</p>

      <details v-if="hasMore" class="board-card__more">
        <summary>Read full profile</summary>
        <p v-for="para in member.bio" :key="para">{{ para }}</p>
        <template v-if="member.qualifications?.length">
          <h4>Qualifications and training</h4>
          <ul>
            <li v-for="q in member.qualifications" :key="q">{{ q }}</li>
          </ul>
        </template>
      </details>
    </div>
  </article>
</template>

<style scoped>
.board-card {
  display: grid;
  gap: 1.5rem;
  padding: clamp(1.25rem, 1rem + 1vw, 2rem);
}

@media (min-width: 760px) {
  .board-card {
    grid-template-columns: 220px 1fr;
    gap: 2rem;
    align-items: start;
  }
}

.board-card__photo {
  aspect-ratio: 4 / 5;
  max-width: 260px;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--navy-800);
  box-shadow: 0 0 0 1px var(--line);
}

.board-card__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.board-card__initials {
  display: grid;
  place-items: center;
  height: 100%;
  font-family: var(--font-serif);
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--gold-400);
}

.board-card__role {
  margin: 0 0 0.35rem;
  font-size: var(--step--1);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-700);
}

.board-card h3 {
  font-size: var(--step-2);
  margin-bottom: 0.2rem;
}

.board-card__title {
  font-weight: 600;
  color: var(--ink-muted);
}

.board-card__summary {
  margin-top: 0.75rem;
}

.board-card__more summary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  font-weight: 650;
  color: var(--navy-700);
  cursor: pointer;
  list-style: none;
  border-radius: 6px;
}

.board-card__more summary::-webkit-details-marker {
  display: none;
}

.board-card__more summary::after {
  content: '+';
  font-size: 1.2em;
  line-height: 1;
  color: var(--gold-700);
}

.board-card__more[open] summary::after {
  content: '−';
}

.board-card__more summary:hover {
  color: var(--gold-700);
}

.board-card__more[open] > :not(summary) {
  margin-top: 0.75rem;
}

.board-card__more h4 {
  font-size: var(--step-0);
  margin-top: 1.25rem;
}

.board-card__more ul {
  padding-left: 1.2rem;
  display: grid;
  gap: 0.3rem;
}

@media print {
  .board-card__more > :not(summary) {
    display: block !important;
  }
}
</style>
