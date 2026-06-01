// https://nuxt.com/docs/api/configuration/nuxt-config

// Production origin (no trailing slash). Social/WhatsApp link previews need an
// ABSOLUTE https URL for the share image, so it is built from this one constant.
// If the site moves to a custom domain, change this single line.
const siteUrl = 'https://moroccan-hackathons.on-forge.com'

const title = 'Moroccan Hackathons: every hackathon in Morocco'
const description =
  'Every upcoming hackathon in Morocco, gathered from across the web and updated daily.'
const ogImage = `${siteUrl}/og.jpg`
const ogImageAlt =
  'Moroccan Hackathons: every hackathon in Morocco, in one place. Updated daily.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // For GitHub Pages served at https://<user>.github.io/<repo>/, uncomment:
  // app: { baseURL: '/hackathons-morocco/' },

  app: {
    head: {
      title,
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: description },
        { name: 'theme-color', content: '#f7f0e2' },

        // Open Graph (WhatsApp, Facebook, LinkedIn, iMessage, Slack, Telegram, Discord)
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Moroccan Hackathons' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:secure_url', content: ogImage },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '2400' },
        { property: 'og:image:height', content: '1260' },
        { property: 'og:image:alt', content: ogImageAlt },
        { property: 'og:locale', content: 'en_US' },

        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
        { name: 'twitter:image:alt', content: ogImageAlt },
      ],
      link: [
        { rel: 'canonical', href: `${siteUrl}/` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500;1,9..144,600&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
    },
  },
})
