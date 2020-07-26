var path = require('path')
var express = require('express')
var proxy = require('http-proxy-middleware')
var port = process.env.PORT || 8080;
var root = path.join(__dirname, '../dist');
var app = express()
var gateway = `http://172.30.103.57:9528 `;

app.use('/api', proxy({ target: gateway, changeOrigin: true }));

var staticOption = {
    index: 'index.html'
}
app.use('/', express.static(root,staticOption));

module.exports = app.listen(port, function (err) {
    if (err) return console.error(err)

    var uri = 'http://0.0.0.0:' + port
    console.log('Listening at ' + uri + '\n')
})
