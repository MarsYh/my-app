const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/nr',
    createProxyMiddleware({
      target: 'http://test.main.newrank.cn',
      changeOrigin: true,
    })
  );
};