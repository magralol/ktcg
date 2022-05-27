import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    target: "static",
    app: {
        meta: [
            { charset: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { name: 'theme-color', content: '#272b30' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'description', content: 'A tool for creating reference cards for Kill Team' },
            { name: 'keywords', content: 'card, creator, generator, reference, Kill Team' },
        ],
        head: {
            link: [
                { rel: 'stylesheet', href: 'css/fontawesome.min.css' },
                { rel: 'manifest', href: 'manifest.json' }
            ]
        },
    },
    css: [
        '@/assets/css/main.scss'
    ]
})
