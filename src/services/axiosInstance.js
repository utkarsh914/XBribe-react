// client.js
var axiosOrig = require('axios');

var axios = axiosOrig.create({
  // baseURL: 'http://localhost:4444/api',
  baseURL: 'https://xbribe.herokuapp.com/api',
  /* other custom settings */
});

module.exports = axios;