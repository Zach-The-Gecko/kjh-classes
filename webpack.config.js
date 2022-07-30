module.exports = {
  rules: [
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader",
      exclude: /node_modules\/@firebase/, //to exclude firebase from source-map
    },
  ],
};
