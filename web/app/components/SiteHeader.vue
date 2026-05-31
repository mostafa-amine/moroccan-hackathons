<template>
  <header class="header">
    <div class="container header__inner">
      <a class="brand" href="/">
        <svg class="brand__mark" viewBox="0 0 60 60" aria-hidden="true">
          <g fill="none" stroke="currentColor" stroke-width="3.5">
            <rect x="13" y="13" width="34" height="34" rx="2" />
            <rect x="13" y="13" width="34" height="34" rx="2" transform="rotate(45 30 30)" />
          </g>
        </svg>
        <span class="brand__name">Moroccan <span class="brand__tld">Hackathons</span></span>
      </a>
      <a class="btn btn--ghost" :href="SITE.formUrl" target="_blank" rel="noopener">
        Submit a hackathon
      </a>
    </div>
  </header>
</template>
