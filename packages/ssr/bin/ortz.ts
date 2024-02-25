#! /usr/bin/env bun

import { parseArgs } from 'util'
import { blue, bold, cyan, green, magenta, yellow } from '../utils/console-style'
import { launch } from '../server/launch'
import type { Args } from '../types/internal'

function main(args: Args) {
  if(args.help) return help()
  return launch(args)
}

export function help() {
  console.log(`\n${bold(magenta('@ortense/ssr'))} is a simple tool to build ${bold(cyan('JSX'))} ${bold(magenta('S'))}erver ${bold(magenta('S'))}ide ${bold(magenta('R'))}ender apps.\n`)
  console.log(`${bold(`Usage: ${magenta('ortz')}`)} ${cyan('[flags]')}\n`)
  console.log(bold('Flags:'))
  console.log(`  ${bold(cyan('--source'))}\t\tSet source folder to load app. Default: ./src`)
  console.log(`  ${bold(cyan('--lang'))}\t\tSet the HTML Document language. Default: en`)
  console.log(`  ${bold(cyan('--port'))}\t\tSet the port for HTTP Server. Default: 3333`)
  console.log(`  ${bold(cyan('--silent'))}\t\tDon't log server requests. Default: NODE_ENV !== 'production'`)
  console.log(`  ${bold(cyan('--nocompress'))}\t\tDisable GZIP Compression.`)

  console.log(`  ${bold(cyan('--patterns.page'))}\tSet page file pattern. Default: **/*.page.{tsx,jsx}`)
  console.log(`  ${bold(cyan('--patterns.style'))}\tSet global css file name. Default: global.css`)
  console.log(`  ${bold(cyan('--patterns.document'))}\tSet custom Document name. Default: Document.tsx`)
  console.log(`  ${bold(cyan('--patterns.assets'))}\tSet assets folder path. Default: assets`)
  console.log(`  ${bold(cyan('--patterns.statics'))}\tSet static files folder path. Default: assets/statics`)

  console.log(`  ${bold(cyan('--help'))}\t\tDisplay this menu and exit`)

  console.log(`\n\nYou can also set the custom options in the package.json adding the property ${bold(yellow('"@ortense/ssr"'))} like the example bellow\n`)
  
  console.log(`  ${bold(yellow('"@ortense/ssr"'))}: {`)
  console.log(`    ${bold(yellow('"source"'))}: ${green('"./source"')},`)
  console.log(`    ${bold(yellow('"lang"'))}: ${green('"pt-BR"')},`)
  console.log(`    ${bold(yellow('"silent"'))}: ${magenta('true')},`)
  console.log(`    ${bold(yellow('"nocompress"'))}: ${magenta('true')},`)
  console.log(`    ${bold(yellow('"port"'))}: ${magenta('8888')},`)
  console.log(`    ${bold(yellow('"patterns"'))}: {`)
  console.log(`      ${bold(yellow('"page"'))}: ${green('"**/pages/*.tsx"')},`)
  console.log(`      ${bold(yellow('"style"'))}: ${green('"style.css"')},`)
  console.log(`      ${bold(yellow('"document"'))}: ${green('"_document.tsx"')},`)
  console.log(`      ${bold(yellow('"assets"'))}: ${green('"resources"')},`)
  console.log(`      ${bold(yellow('"static"'))}: ${green('"statics"')}`)
  console.log(`    }`)
  console.log(`  }`)
}

const { values: args } = parseArgs({
  args: Bun.argv,
  options: {
    source: { type: 'string' },
    port: { type: 'string' },
    lang: { type: 'string' },
    silent: { type: 'boolean' },
    nocompress: { type: 'boolean' },
    'patterns.page': { type: 'string' },
    'patterns.style': { type: 'string' },
    'patterns.document': { type: 'string' },
    'patterns.assets': { type: 'string' },
    'patterns.static': { type: 'string' },
     help: { type: 'boolean' },
  },
  strict: true,
  allowPositionals: true,
})

main(args)
