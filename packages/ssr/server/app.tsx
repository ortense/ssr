import './compression'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { logger } from 'hono/logger'
import { 
  showRequestLogMessage,
  showRouteConflictMessage,
  showRouteRegisteredMessage,
} from '../utils/console-messages'

import type { PageModule, Settings } from '../types/internal'
import type { DocumentProps, PageProps } from '../types/public'


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
    const routeConflict = registers.get(page.route)
    
    if(routeConflict) {
      return showRouteConflictMessage(page.route, page.paths.relative, routeConflict)
    }

    app.get(page.route, (c) => {
      if (!options.settings.silent) showRequestLogMessage(page.route)

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
    showRouteRegisteredMessage(page.route, page.paths.relative)
  })

  return app
}
