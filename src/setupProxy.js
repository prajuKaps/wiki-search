const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/wikiApi",
    createProxyMiddleware({
      target: "https://en.wikipedia.org",
      changeOrigin: true,
      pathRewrite: {
        "^/wikiApi": "/w/api.php"
      }
    })
  );
};
