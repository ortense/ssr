import { Style, css } from 'hono/css'
import { HTML } from './HTML'
import { Meta } from './Meta'

export function Document({ page }: DocumentProps) {
  return (
    <HTML lang="en">
        <head>
          { page.Head && <page.Head {...page.props} /> }
          { page.title && <title>{page.title}</title> }
          <Meta data={page.meta} />
          <Style>{ css`${page.style}` }</Style>
        </head>
        <body>
          <page.Body {...page.props} />
        </body>
      </HTML>
  )
}
