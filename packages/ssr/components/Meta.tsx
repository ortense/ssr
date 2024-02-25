import type { PageMeta } from '../types/public'

type Props = { data: PageMeta[] }

export function Meta({ data }: Props) {
  return <>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    { data?.map(props => (<meta {...props} />)) }
  </>
}
