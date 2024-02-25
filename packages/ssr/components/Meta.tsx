import type { PageMeta } from '../types'

type Props = { data: PageMeta[] }

export function Meta({ data }: Props) {
  return <>
    { data?.map(({name, content}) => (<meta name={name} content={content} />)) }
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
}
