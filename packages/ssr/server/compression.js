// @bun
import zlib from 'node:zlib'

const make = (ctx, handle) => Object.assign(ctx, {
  writable: new WritableStream({
    write: chunk => handle.write(chunk),
    close: () => handle.end()
  }),
  readable: new ReadableStream({
    type: 'bytes',
    start (ctrl) {
      handle.on('data', chunk => ctrl.enqueue(chunk))
      handle.once('end', () => ctrl.close())
    }
  })
})

globalThis.CompressionStream ??= class CompressionStream {
  constructor(format) {
    make(this, format === 'deflate' ? zlib.createDeflate() :
    format === 'gzip' ? zlib.createGzip() : zlib.createDeflateRaw())
  }
}

globalThis.DecompressionStream ??= class DecompressionStream {
  constructor(format) {
    make(this, format === 'deflate' ? zlib.createInflate() :
    format === 'gzip' ? zlib.createGunzip() :
    zlib.createInflateRaw())
  }
}
