export default {
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ],
  loaders: {
    ts: {
      silent: true
    },
    tsx: {
      silent: true
    }
  }
}
