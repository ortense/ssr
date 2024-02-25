import './compression'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { logger } from 'hono/logger'
import type { PageModule, Settings } from '../types/internal'
import type { DocumentProps, PageProps } from '../types/public'
import { bold, green } from '../utils/console-style'

type ServerOptions = {
  pages: PageModule[]
  Document: (props: DocumentProps) => JSX.Element
  settings: Settings
}

export function createServerApp(options: ServerOptions) {
  const app = new Hono()

  if(!options.settings.nocompress) {
    app.use(compress({ encoding: 'gzip' }))
  }

  if (!options.settings.silent) {
    app.use(logger())
  }

  options.pages.map((page) => {
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

    console.log(` 🛣️  Add route ${bold(green(page.route))}`)
  })

  return app
}
