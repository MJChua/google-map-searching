module.exports = {
  devServer: {
    proxy: {
      "/search-api": {
        target: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        changeOrigin: true,
        pathRewrite: { "/search-api": "" }
      }
    }
  }
};
