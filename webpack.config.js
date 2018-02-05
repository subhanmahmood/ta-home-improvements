var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
  entry: {
    dashboard: './src/dashboard.js',
    customers: './src/customers.js',
    jobs: './src/jobs.js',
    parts: './src/parts.js',
    editCustomer: './src/editCustomer.js',
    job: './src/job.js',
    appointments: './src/appointments.js',
    finances: './src/finances.js',
    invoice: './src/invoice.js',
    signin: './src/signin.js',
    signup: './src/signup.js'
  },
  output: {
    filename: 'public/build/[name].bundle.js',
    sourceMapFilename: 'public/build/[name].bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015' ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: /flexboxgrid/
      }
    ]
  }
}
