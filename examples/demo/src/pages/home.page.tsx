import type { PageMeta } from '@ortense/ssr'
import { Heading1 } from '../components/SimpleComponent'

export const route = '/'

export const title = 'Home Page'

export const meta: PageMeta[] = [
  { name: 'description', content: 'this is the homepage' },
  { name: 'keywords', content: 'hono, ssr, tsx' },
]

export default function Home() {
  return <Heading1>Home Page</Heading1>
}
