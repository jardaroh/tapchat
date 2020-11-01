module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:9000',
          changeOrigin: true,
          pathRewrite: { '^/api': '/' },
        },
        '^/socket.io': {
          target: 'http://localhost:9000',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  },
};
