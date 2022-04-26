'use strict';

const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer({
  presets: [
    ['@babel/preset-react'],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-syntax-jsx'],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
});
