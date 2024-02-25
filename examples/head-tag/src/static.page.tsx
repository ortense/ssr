export const route = '/'

export const title = 'Example static value'

export const meta = [
  { name: 'description', content: 'This create a static meta tag description' },
  { name: 'author', content: 'Marcus Ortense' },
]

export default function StaticValues() {
  return <h1>See the title and meta tags in the html head</h1>
}
