import { bold, cyan, green, magenta, red, underline, yellow } from './console-style'

export function showPreparingAppMessage() {
  console.log(`\n 🥁 Preparing ${bold(magenta('@ortense/ssr'))} app\n`)
}

export function showServerLaunchedMessage(url: string) {
  console.log(`\n 🚀 Server launched at ${underline(cyan(url))}`)
}

export function showLookingForPagesMessage(pattern: string) {
  console.log(` 🔍️ Looking for pages in ${pattern} \n`)
}

export function showGlobalStyleFoundMessage(location: string) {
  console.log(` 💅 Global style found in ${location} \n`)
}

export function showRouteRegisteredMessage(route: string, file: string) {
  console.log(` 🛣️  route ${bold(green(route))} registered by ${yellow(file)}`)
}

export function showErrorMessage(title: string, description: string) {
  console.error(`\n ${bold(red(`💥 ${title}`))}\n ${description}\n`)
}

export function showRouteConflictMessage(route: string, conflictFile: string, registeredFile: string) {
  const error = `${red('Unable to register route')} ${green(route)} ${red('from')} ${yellow(conflictFile)}`
  const cause = `${red('route already registered by')} ${yellow(registeredFile)}`
  showErrorMessage('ROUTE CONFLICT!', `${error} ${cause}`)
}

export function showRequestLogMessage(route: string) {
  console.log(`  --> GET ${route}`)
}

export function showHelpMessage() {
  const libName = bold(magenta('@ortense/ssr'))
  const jsx = bold(cyan('JSX'))
  const ssr = `${bold(magenta('S'))}erver ${bold(magenta('S'))}ide ${bold(magenta('R'))}ender`
  console.log(`\n${libName} is a simple tool to build ${jsx} ${ssr} apps.\n`)
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

  console.log(`\n\nYou can also set the custom options in the package.json in the ${libName} property.\n`)
  
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
