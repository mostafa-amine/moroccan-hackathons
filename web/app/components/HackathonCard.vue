<script setup lang="ts">
const props = defineProps<{ hackathon: any }>()

const mounted = ref(false)
const days = ref<number | null>(null)
onMounted(() => {
  mounted.value = true
  days.value = daysUntil(props.hackathon.start_date)
})

const dateLabel = computed(() =>
  formatDateRange(props.hackathon.start_date, props.hackathon.end_date),
)

const formatLabel = computed(
  () =>
    ({ 'in-person': 'In person', hybrid: 'Hybrid', online: 'Online' } as Record<string, string>)[
      props.hackathon.format
    ] ?? props.hackathon.format,
)

const ctaHref = computed(
  () => props.hackathon.registration_url || props.hackathon.sources?.[0]?.url || '#',
)
const ctaLabel = computed(() => (props.hackathon.registration_url ? 'Register' : 'View source'))

const countdown = computed(() => {
  if (days.value === null || days.value < 0) return null
  if (days.value === 0) return 'Today'
  if (days.value === 1) return 'Tomorrow'
  return `In ${days.value} days`
})
</script>

<template>
  <article class="card">
    <div class="card__top">
      <span class="badge" :class="`badge--${hackathon.format}`">{{ formatLabel }}</span>
      <span v-if="mounted && countdown" class="pill">{{ countdown }}</span>
    </div>

    <h3 class="card__title">{{ hackathon.name }}</h3>

    <ul class="card__meta">
      <li>
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="17" rx="2" />
          <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
        </svg>
        {{ dateLabel }}
      </li>
      <li>
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span>{{ hackathon.city }}<template v-if="hackathon.venue"> · {{ hackathon.venue }}</template></span>
      </li>
      <li v-if="hackathon.cost">
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" />
        </svg>
        {{ hackathon.cost }}
      </li>
    </ul>

    <p v-if="hackathon.description" class="card__desc">{{ hackathon.description }}</p>

    <div v-if="hackathon.themes?.length" class="chips">
      <span v-for="t in hackathon.themes" :key="t" class="chip">{{ t }}</span>
    </div>

    <div class="card__foot">
      <div class="card__org">
        <span v-if="hackathon.organizer" class="org-name">{{ hackathon.organizer }}</span>
        <span class="verified" :title="`Verified ${hackathon.last_verified}`">✓ Verified</span>
      </div>
      <a class="btn btn--sm card__cta" :href="ctaHref" target="_blank" rel="noopener">
        {{ ctaLabel }}
      </a>
    </div>
  </article>
</template>
