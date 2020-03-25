const withOffline = require('next-offline')

const withAssetRelocator = (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            const { isServer } = options

            if (isServer) {
                config.node = Object.assign({}, config.node, {
                    __dirname: false,
                    __filename: false,
                })

                config.module.rules.unshift({
                    test: /\.(m?js|node)$/,
                    parser: { amd: false },
                    use: {
                        loader: '@zeit/webpack-asset-relocator-loader',
                        options: {
                            outputAssetBase: 'assets',
                            existingAssetNames: [],
                            wrapperCompatibility: true,
                            escapeNonAnalyzableRequires: true,
                        },
                    },
                })
            }

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options)
            }
            return config
        },
    })
}

module.exports = withAssetRelocator(
    withOffline({
        reactStrictMode: true,
        experimental: {
            jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
        },
        workboxOpts: {
            swDest: 'public/service-worker.js',
            runtimeCaching: [
                {
                    urlPattern: /^https?.*/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'https-calls',
                        networkTimeoutSeconds: 3,
                        expiration: {
                            maxEntries: 150,
                            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
        },
        target: 'serverless',
    })
)
