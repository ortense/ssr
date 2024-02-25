export const route = '/dynamic'

export function Head() {
  const now = new Date()
  return <>
    <title>{now.toISOString()}</title>
    <meta name="description" content={`dynamic meta created at ${now.toLocaleDateString()}`} />
  </>
}

export default function DynamicHead() {
  return <h1>See request time in the title</h1>
}
