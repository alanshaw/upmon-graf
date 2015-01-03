var http = require('http')
var config = require('rc')('upmon', {
  graf: {
    port: process.env.PORT || 5000
  }
})
var shoe = require('shoe')
var ecstatic = require('ecstatic')(__dirname + '/client')
var through = require('through2')
var xtend = require('xtend')

module.exports = function (opts) {
  opts = xtend(config.graf, opts)

  var server = http.createServer(ecstatic).listen(opts.port)
  var ts = through()

  var sock = shoe(function (stream) {
    ts.pipe(stream)
  })

  sock.install(server, '/sock')

  return ts
}


