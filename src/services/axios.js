// client.js
var axiosOrig = require('axios');

var axios = axiosOrig.create({
  // baseURL: 'http://localhost:4444',
  baseURL: 'https://xbribe-api.herokuapp.com',
  /* other custom settings */
});

module.exports = axios;