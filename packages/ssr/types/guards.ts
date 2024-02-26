import type { PageModule } from './internal'
import type { PageMeta } from './public'

const validMetaName = ['application-name', 'author', 'description', 'generator', 'keywords', 'viewport']

const validMetaHTTPequiv = ['content-security-policy', 'content-type', 'default-style', 'refresh']

export function isPageMeta(value: unknown): value is PageMeta {
  const meta = value as PageMeta

  if (typeof meta !== 'object') return false
  if (typeof meta.content !== 'string') return false
  if ('name' in meta && !validMetaName.includes(meta.name)) return false
  if ('http-equiv' in meta && !validMetaHTTPequiv.includes(meta['http-equiv'])) return false

  return true
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
