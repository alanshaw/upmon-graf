var http = require('http')
var config = require('rc')('upmon-graf')
var shoe = require('shoe')
var ecstatic = require('ecstatic')(__dirname + '/client')

var server = http.createServer(ecstatic)
var port = process.env.PORT || config.port || 5000

server.listen(port, function () {
  console.log('upmon-graf listening on :' + port)
})

var sock = shoe(function (stream) {
  process.stdin.pipe(stream)
})

sock.install(server, '/sock')
