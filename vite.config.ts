/// <reference types="vitest/config" />
/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import { renameSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { staticPaths } from './src/router/paths.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const siteUrl = (env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, '')

  return {
    plugins: [vue()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      dirStyle: 'nested',
      // '/404' renders the catch-all route; it is moved to dist/404.html below for static hosts.
      includedRoutes: () => [...staticPaths, '/404'],
      onFinished() {
        const today = new Date().toISOString().slice(0, 10)
        const urls = staticPaths
          .map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`)
          .join('\n')
        const outDir = resolve(process.cwd(), 'dist')
        renameSync(resolve(outDir, '404/index.html'), resolve(outDir, '404.html'))
        rmSync(resolve(outDir, '404'), { recursive: true })
        writeFileSync(
          resolve(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        )
        writeFileSync(
          resolve(outDir, 'robots.txt'),
          `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
        )
      },
    },
    test: {
      environment: 'jsdom',
      include: ['tests/**/*.spec.ts'],
    },
  }
})
