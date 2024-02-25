
import { getPages } from './loader'
import { createServerApp } from './app'
import { Document } from '../components/Document'
import { getSettings } from '../settings'
import { bold, magenta, underline } from '../utils/console-style'
import type { Args } from '../types/internal'

export async function launch(args: Args) {
  console.log(`\n 🥁 Preparing ${bold(magenta('@ortense/ssr'))} app\n`)

  const settings = await getSettings(args)
  const pages = await getPages(settings)

  const app = createServerApp({
    Document,
    settings,
    pages
  })

  const server = Bun.serve({
    port: settings.port,
    fetch: app.fetch,
  })

  console.log(`\n 🚀 Server launched at ${underline(server.url.toString())}\n`)
}
