import { Style as HonoStyle, css } from 'hono/css'

export function Style({ children }: { children: string }) {
  return <HonoStyle>{ css`${children}` }</HonoStyle>
}
