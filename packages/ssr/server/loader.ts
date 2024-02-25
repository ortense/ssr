import { isPageModule } from '../types/guards'
import type { PageModule, Settings } from '../types/internal'

export async function getStyle(path: string) {
  const file = Bun.file(path)

  if(!(await file.exists())) return ''

  return file.text()
}

export async function getPageStyle(path: string) {
  return getStyle(`${path.slice(0, -4)}.css`)
}

export async function getPageModule(path: string, globalStyle: string): Promise<PageModule> {
  const [dynamic, pageStyle] = await Promise.all([import(path),getPageStyle(path)])

  const mod = {
    Head: dynamic.Head || null,
    Body: dynamic.default,
    style: `${globalStyle}${pageStyle}`,
    route: dynamic.route,
    meta: dynamic.meta || [],
    title: dynamic.title || '',
  }

  if(isPageModule(mod)) return mod

  throw new Error(`${path} does not export a valid page module`)
}

export async function getPages(settings: Settings) {
  const globalStyle = await getStyle(`${settings.workdir}/${settings.patterns.style}`)

  if(globalStyle) console.log(` 💅 Global style found in ${settings.source}/${settings.patterns.style} \n`)

  const glob = new Bun.Glob(settings.patterns.page)

  console.log(` 🔍️ Looking for pages in ${settings.source}/${settings.patterns.page} \n`)

  const pageModules = await Promise.all(
    Array
      .from(glob.scanSync({ cwd: settings.workdir }))
      .map(path => getPageModule(`${settings.workdir}/${path}`, globalStyle)))

    return pageModules.sort(compareRoutes)
}

function countParams (route: string) {
  return (route.match(/:\w+/g) || []).length
}

function compareRoutes(a: PageModule, b: PageModule) {
  const countA = countParams(a.route)
  const countB = countParams(b.route)

  if (countA !== countB) return countA - countB

  return b.route.indexOf('/:') - a.route.indexOf('/:')
}
