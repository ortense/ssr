import { resolve } from 'node:path'
import { deepMerge } from '../utils/deep-merge'
import { customSettingsSchema } from './schema'

import type { DeepPartial } from '../types/utility'
import type { Args, CustomSettings, Settings } from '../types/internal'

export const defaultSettings: CustomSettings = customSettingsSchema.parse({})

function getArgsSettings(args: Args) {
  return {
    source: args.source,
    port: args.port ? Number(args.port) : args.port,
    lang: args.lang,
    silent: args.silent,
    patterns: {
      page: args['patterns.page'],
      style: args['patterns.style'],
      document: args['patterns.document'],
      assets: args['patterns.assets'],
      static: args['patterns.static'],
    },
  } as DeepPartial<CustomSettings>
}

export function getWorkdir(source: string) {
  return resolve(`${import.meta.env.PWD}`, `${source}`)
}

async function getPackageSettings () {
  const file = Bun.file(resolve(`${import.meta.env.PWD}`, `./package.json`))
  const packageNotFound = !(await file.exists())

  if(packageNotFound) return defaultSettings

  const settings: DeepPartial<Settings>  = (await file.json())['@ortense/ssr'] || {}

  return settings
}

export async function getSettings(args:Args): Promise<Settings> {
  const packageSettings = await getPackageSettings()
  const argsSettings = getArgsSettings(args)
  const userSettings = customSettingsSchema.parse(deepMerge(packageSettings , argsSettings))
  const workdir = getWorkdir(userSettings.source)

  const settings: Settings = {
    workdir,
    ...userSettings
  } as const

  return settings
}
