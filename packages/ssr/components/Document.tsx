import { HTML } from './HTML'
import { Meta } from './Meta'
import { Style } from './Style'
import type { DocumentProps } from '../types/public'

export function Document({ page, settings, globalStyle }: DocumentProps) {
  return (
    <HTML lang={settings.lang}>
      <head>
        { page.Head && <page.Head {...page.props} /> }
        { page.title && <title>{page.title}</title> }
        <Meta data={page.meta} />
        <Style>{`${globalStyle}${page.style}`}</Style>
      </head>
      <body>
        <page.Body {...page.props} />
      </body>
    </HTML>
  )
}
