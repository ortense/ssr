import type { PageModule } from './internal'
import type { PageMeta } from './public'

export function isPageMeta(value: unknown): value is PageMeta {
  const meta = value as PageMeta

  return typeof meta === 'object'
    && typeof meta.name === 'string'
    && typeof meta.content === 'string'
}

export function isPageModule(value: unknown): value is PageModule {
  const mod = value as PageModule

  if(typeof mod !== 'object') return false
  if(typeof mod.route !== 'string') return false
  if(typeof mod.Body !== 'function') return false
  if(!(typeof mod.Head === 'function' || mod.Head === null)) return false
  if(!Array.isArray(mod.meta)) return false
  
  return mod.meta.length === 0 || mod.meta.every(isPageMeta)
}
