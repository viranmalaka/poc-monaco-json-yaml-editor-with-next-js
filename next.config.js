/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    // https://dev.to/swyx/how-to-add-monaco-editor-to-a-next-js-app-ha3
    if (!options.isServer) {
      const specificRules = config.module.rules.find((rule) => rule.oneOf).oneOf
      const cssRule = specificRules.find(
        (rule) =>
          rule.test &&
          Array.isArray(rule.use) &&
          [].concat(rule.test).some((test) => test.test('anything.css'))
      )
      specificRules.unshift({
        sideEffects: true,
        test: /[\\/]node_modules[\\/]monaco-editor[\\/].+\.css$/,
        use: cssRule.use,
      })
    }
    return config;
  }
}

module.exports = nextConfig
