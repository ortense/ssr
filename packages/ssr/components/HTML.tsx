import { html } from 'hono/html'

export function HTML({ lang, children }: { lang: string, children: any }) {
  return html`<!DOCTYPE html><html lang="${lang}">${children}</html>`
}
