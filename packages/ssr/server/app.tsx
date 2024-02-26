import './compression'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { logger } from 'hono/logger'
import type { PageModule, Settings } from '../types/internal'
import type { DocumentProps, PageProps } from '../types/public'
import { bold, green, red, yellow } from '../utils/console-style'

type ServerOptions = {
  pages: PageModule[]
  Document: (props: DocumentProps) => JSX.Element
  settings: Settings
  globalStyle: string
}

export function createServerApp(options: ServerOptions) {
  const app = new Hono()

  if(!options.settings.nocompress) {
    app.use(compress({ encoding: 'gzip' }))
  }

  if (!options.settings.silent) {
    app.use(logger())
  }

  const registers: Map<string, string> = new Map()

  options.pages.forEach((page) => {

    if(registers.has(page.route)) {
      console.error(`${bold(red('\n 💥 ROUTE CONFLICT!'))}\n ${red('Unable to register route')} ${green(page.route)} ${red('in')} ${yellow(page.paths.relative)} ${red('route already registered by')} ${yellow(registers.get(page.route) as string)}\n`)
      return
    }

    app.get(page.route, (c) => {
      if (!options.settings.silent) console.log(`  --> GET ${page.route}`)

      const pageProps: PageProps = {
        route: page.route,
        url: c.req.url,
        params: c.req.param() as Record<string, string>,
      }

      return c.html(
        <options.Document
          settings={options.settings}
          globalStyle={options.globalStyle}
          page={{
            props: pageProps,
            title: page.title,
            meta: page.meta,
            Head: page.Head,
            Body: page.Body,
            style: page.style,
          }}
        />
      )
    })

    registers.set(page.route, page.paths.relative)
    console.log(` 🛣️  route ${bold(green(page.route))} registered by ${yellow(page.paths.relative)}`)
  })

  return app
}
