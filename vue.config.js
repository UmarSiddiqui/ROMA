const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Expense/GetAll', // Your API endpoint
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },

  pluginOptions: {
    vuetify: {}
  },

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          isCustomElement: tag => tag === 'dotlottie-player'
        }
        return options
      })
  }
};
