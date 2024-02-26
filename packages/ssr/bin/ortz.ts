#! /usr/bin/env bun

import { parseArgs } from 'util'
import { launch } from '../server/launch'
import { showHelpMessage } from '../utils/console-messages'
import type { Args } from '../types/internal'

function main(args: Args) {
  if(args.help) return showHelpMessage()
  return launch(args)
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
