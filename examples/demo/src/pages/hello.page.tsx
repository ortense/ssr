import type { PageProps } from '@ortense/ssr'
import { Heading1 } from '../components/SimpleComponent'

export const route = '/hello/:name'

export default function Hello({ params, url }: PageProps<typeof route>) {
  const { name } = params
  return <>
    <Heading1>{`Hello ${name}!`}</Heading1>
    <p>You access the {url} at {new Date().toTimeString()}</p>
  </>
}
