import { resolve } from 'node:path'
import { isPageModule } from '../types/guards'
import type { PageModule, Settings } from '../types/internal'
import { cyan, red, yellow } from '../utils/console-style'

export async function getStyle(path: string) {
  const file = Bun.file(path)

  if(!(await file.exists())) return ''

  return file.text()
}

export async function getPageStyle(path: string) {
  return getStyle(`${path.slice(0, -4)}.css`)
}

export async function createPageModule(settings: Settings, path: string): Promise<PageModule> {
  const localtion = resolve(settings.workdir, path)

  const [dynamic, pageStyle] = await Promise.all([import(localtion), getPageStyle(localtion)])

  const mod: PageModule = {
    Head: dynamic.Head || null,
    Body: dynamic.default,
    style: `${pageStyle}`,
    route: dynamic.route,
    meta: dynamic.meta || [],
    title: dynamic.title || '',
    paths: {
      absolute: localtion,
      relative: localtion.replace(settings.workdir, settings.source)
    }
  }

  if(isPageModule(mod)) return mod
  
  throw new Error(`${path} does not export a valid page module`)
}

export async function getGlobalStyle(settings: Settings) {
  const globalStyle = await getStyle(`${settings.workdir}/${settings.patterns.style}`)

  if(globalStyle) console.log(` 💅 Global style found in ${settings.source}/${settings.patterns.style} \n`)

  return globalStyle
}

export async function getPages(settings: Settings) {
  const glob = new Bun.Glob(settings.patterns.page)

  console.log(` 🔍️ Looking for pages in ${settings.source}/${settings.patterns.page} \n`)

  const pageModules = await Promise.all(
    Array
      .from(glob.scanSync({ cwd: settings.workdir }))
      .map(path => createPageModule(settings, path)))

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
