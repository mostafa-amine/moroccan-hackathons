<script setup lang="ts">
import dataset from '~/data/hackathons.json'

const hackathons = ((dataset as any).hackathons ?? []) as any[]
const sorted = [...hackathons].sort((a, b) => a.start_date.localeCompare(b.start_date))
const count = sorted.length
</script>

<template>
  <section class="hero">
    <div class="container hero__inner">
      <span class="hero__eyebrow">🇲🇦 Morocco · updated weekly</span>
      <h1 class="hero__title">
        Every hackathon in Morocco,<br />
        <em class="hero__accent">in one place.</em>
      </h1>
      <p class="hero__sub">
        Scattered across Instagram, LinkedIn, and a dozen campus pages, gathered here, verified
        against a real source, and updated weekly.
      </p>
      <div class="hero__stats">
        <span class="stat">
          <strong>{{ count }}</strong> upcoming {{ count === 1 ? 'hackathon' : 'hackathons' }}
        </span>
      </div>
    </div>
  </section>

  <section class="list">
    <div class="container">
      <div v-if="count" class="grid">
        <HackathonCard v-for="h in sorted" :key="h.id" :hackathon="h" />
      </div>

      <div v-else class="empty">
        <h2>No upcoming hackathons listed right now.</h2>
        <p>Know one that's coming up? Be the first to add it.</p>
        <a class="btn btn--lg" :href="SITE.formUrl" target="_blank" rel="noopener">
          Submit a hackathon
        </a>
      </div>
    </div>
  </section>

  <SubmitCta v-if="count" />
</template>
