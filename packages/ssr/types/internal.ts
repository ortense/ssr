import type { z } from 'zod'
import type { Nullable, Undefinable } from './utility'
import type { customSettingsSchema } from '../settings/schema'
import type { PageMeta, PageProps } from './public'

export type Args = {
  source: Undefinable<string>
  port: Undefinable<string>
  lang: Undefinable<string>
  silent: Undefinable<boolean>
  nocompress: Undefinable<boolean>
  'patterns.page': Undefinable<string>
  'patterns.style': Undefinable<string>
  'patterns.document': Undefinable<string>
  'patterns.assets': Undefinable<string>
  'patterns.static': Undefinable<string>
  help: Undefinable<boolean>
}

export type CustomSettings = z.infer<typeof customSettingsSchema>
export type Settings = CustomSettings & { workdir: string }

export type PageModule = {
  route: string
  Body: (props: PageProps) => JSX.Element
  meta: PageMeta[]
  style: Nullable<string>
  title: Nullable<string>
  Head: Nullable<(props: PageProps) => JSX.Element>
}
