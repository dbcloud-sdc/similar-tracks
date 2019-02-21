
module.exports = {
  entry: './client/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,

    // every request made to 'locahost:8080/api/xxxx' will be proxyfied to 'http://localhost:3000/api/xxxx'

    // this works as follows:
    // when React makes a request to the webpack dev server for a route matching /api/* on port 8080,
    // webpack dev server then takes the request and forwards it on to express on port 3000,
    // express gets that request coming in on /api/*:3000 and does its usual thing, and returns its response to dev server,
    // dev server then takes what it got coming back from express, and forwards it on to the React app.

    // this way, as far as react is concerned, it only ever talked to web pack dev server on port 8080
    // so we dont get CORS errors.

    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
