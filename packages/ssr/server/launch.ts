
import { getGlobalStyle, getPages } from './loader'
import { createServerApp } from './app'
import { Document } from '../components/Document'
import { getSettings } from '../settings'
import { showPreparingAppMessage, showServerLaunchedMessage } from '../utils/console-messages'
import type { Args } from '../types/internal'

export async function launch(args: Args) {
  showPreparingAppMessage()

  const settings = await getSettings(args)
  const [pages, globalStyle] = await Promise.all([
    getPages(settings),
    getGlobalStyle(settings),
  ])

  const app = createServerApp({
    Document,
    settings,
    pages,
    globalStyle,
  })

  const server = Bun.serve({
    port: settings.port,
    fetch: app.fetch,
  })

  showServerLaunchedMessage(server.url.toString())
}
