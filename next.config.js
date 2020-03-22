const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const withAssetRelocator = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;

      if (isServer) {
        config.node = Object.assign({}, config.node, {
          __dirname: false,
          __filename: false
        });

        config.module.rules.unshift({
          test: /\.(m?js|node)$/,
          parser: { amd: false },
          use: {
            loader: "@zeit/webpack-asset-relocator-loader",
            options: {
              outputAssetBase: "assets",
              existingAssetNames: [],
              wrapperCompatibility: true,
              escapeNonAnalyzableRequires: true
            }
          }
        });
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });
};

module.exports = withAssetRelocator({
  reactStrictMode: true,
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
  target: "serverless"
});
