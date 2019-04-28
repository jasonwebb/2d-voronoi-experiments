const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    basic: path.resolve('basic/js/entry.js'),
    rings: path.resolve('rings/js/entry.js'),
    ringsInMotion: path.resolve('rings-in-motion/js/entry.js'),
    orbits: path.resolve('orbits/js/entry.js'),
    playground: path.resolve('playground/js/entry.js'),
    reducingRadii: path.resolve('reducing-radii/js/entry.js'),
    phyllotaxis: path.resolve('phyllotaxis/js/entry.js')
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '127.0.0.1',
    port: 9001,
    publicPath: '/dist/',
    contentBase: path.resolve('./'),
    compress: true,
    open: true,
    watchContentBase: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist')
  }
}