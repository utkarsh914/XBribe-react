// client.js
var axiosOrig = require('axios');

var axios = axiosOrig.create({
  baseURL: 'http://localhost:4444',
  // baseURL: 'https://test-getoxdev.herokuapp.com/api',
  /* other custom settings */
});

module.exports = axios;