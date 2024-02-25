
import type { Settings } from './internal'
import type { Nullable } from './utility'

export type PageProps<T extends string = string> = {
  route: string
  url: string
  params: Record<RouteParams<T>, string>
}

export type RouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}` ? Param | RouteParams<Rest> :
  T extends `${infer _Start}:${infer Param}` ? Param :
  never

  export type PageMeta = 
  | {
      name: 'application-name' | 'author' | 'description' | 'generator' | 'keywords' | 'viewport'
      content: string 
    }
  | { 
      'http-equiv': 'content-security-policy' | 'content-type' | 'default-style' | 'refresh'
      content: string 
    }

export type Page = {
  props: PageProps
  meta: PageMeta[]
  title: Nullable<string>
  Head: Nullable<(props: PageProps) => JSX.Element>
  Body: (props: PageProps) => JSX.Element
  style: Nullable<string>
}

export type DocumentProps = {
  page: Page
  settings: Settings
}
