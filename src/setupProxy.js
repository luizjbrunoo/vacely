const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Se você estiver fazendo proxy de chamadas de API específicas
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Content-Security-Policy'] = "default-src 'self'; frame-ancestors 'self' http://localhost:3002 https://us-east-1.quicksight.aws.amazon.com";
      }
    })
  );
};
