const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (args) => {
  console.log('-------------------------------------------------------');
  console.log('Unicorn Ideas bundle...');
  console.log(args);
  console.log('-------------------------------------------------------');

  return {
    mode: 'production',
    devtool: false,
    entry: {
      unicorns: './src/index.js',
    },
    output: {
      publicPath: '/',
      filename: '[name].js',
      sourceMapFilename: '[id].[contenthash].chunk.map',
      chunkFilename: '[id].[contenthash].chunk.js',
      path: path.resolve(__dirname, 'build/'),
      library: 'Unicorns',
      libraryTarget: 'umd',
      globalObject: 'this',
      assetModuleFilename: 'images/[name].[contenthash][ext]',
    },
    externals: {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
      },
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      },
    },
    optimization: {
      usedExports: true,
      minimize: true,
      emitOnErrors: true,
      removeAvailableModules: true,
      concatenateModules: true,
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            reuseExistingChunk: false,
            filename: (pathData) => {
              return `${pathData.chunk.id}.[contenthash].vendor.js`;
            },
          },
          default: {
            reuseExistingChunk: false,
          },
        },
      },
      minimizer: [
        new MiniCssExtractPlugin({
          filename: (pathData) => {
            return `${pathData.chunk.name}.[contenthash].css`;
          },
          chunkFilename: (pathData) => {
            return `${pathData.chunk.id}.[contenthash].css`;
          },
        }),
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: (astNode, comment) => {
                return comment.value.startsWith('! Legalities ');
              },
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new LicenseWebpackPlugin({
        addBanner: true,
        renderBanner: (filename, modules) => {
          return `/*! Legalities ${filename}*/`;
        },
        handleMissingLicenseText: (packageName, licenseType) => {
          console.log(`No license found for ${packageName}`);
          return 'UNKNOWN';
        },
      }),
    ],
    module: {
      rules: [
        { oneOf: [{ type: 'javascript/auto' }] },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.(png|jpg|jpeg|webp|gif|svg|ico)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(s*)css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
  };
};
