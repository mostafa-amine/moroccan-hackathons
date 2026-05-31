<script setup lang="ts">
import dataset from '~/data/hackathons.json'
const generatedAt = (dataset as any).generated_at as string | null
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__line">Open data · Every event verified against a real source.</p>
      <p class="footer__meta">
        <template v-if="generatedAt">Last updated {{ niceDate(generatedAt) }} · </template>
        <a :href="SITE.githubUrl" target="_blank" rel="noopener">Open source on GitHub</a>
      </p>
    </div>
  </footer>
</template>
