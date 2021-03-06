// module.exports = {
//   configureWebpack: {
//   },
//   devServer: {
//     public: '10.130.1.89:8080',
//     hot: true,
//     disableHostCheck: true,
//   },
// };

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
  }
}