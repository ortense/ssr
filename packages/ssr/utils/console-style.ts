const x1b = (n: number) => `\x1b[${n}m`

const resetCode = x1b(0)
const boldCode = x1b(1)
const underlineCode = x1b(4)

const redCode = x1b(31)
const greenCode = x1b(32)
const yellowCode = x1b(33)
const blueCode = x1b(34)
const magentaCode = x1b(35)
const cyanCode = x1b(36)

export const bold = (s: string) => `${boldCode}${s}${resetCode}`
export const underline = (s: string) => `${underlineCode}${s}${resetCode}`
export const red = (s: string) => `${redCode}${s}${resetCode}`
export const green = (s: string) => `${greenCode}${s}${resetCode}`
export const yellow = (s: string) => `${yellowCode}${s}${resetCode}`
export const blue = (s: string) => `${blueCode}${s}${resetCode}`
export const magenta = (s: string) => `${magentaCode}${s}${resetCode}`
export const cyan = (s: string) => `${cyanCode}${s}${resetCode}`
