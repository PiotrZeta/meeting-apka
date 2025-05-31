module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic' // automatyczny import React dla JSX
      }
    ],
    '@babel/preset-typescript'
  ]
};
