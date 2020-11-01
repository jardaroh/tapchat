module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '^/socket.io': {
          target: 'http://localhost:9000',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  },
};
