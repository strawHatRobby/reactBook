import './main.css';
import App from './components/App.jsx'
import React from 'react';
import ReactDOM from 'react-dom';

module.exports = {
  plugins: [
    require('babel-plugin-syntax-class-properties'),
    require('babel-plugin-syntax-decorators'),
    require('babel-plugin-syntax-object-rest-spread'),
    // You can pass parameters using an array syntax
    [
      require('babel-plugin-transform-regenerator'),
      {
async: false,
asyncGenerators: false }
] ]
};

require('./main.css');
var component = require('./component'); 
ReactDOM.render(<App />, document.getElementById('app'));
