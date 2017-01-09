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
var Cache = require('./cache')

module.exports = function (opts) {
  opts = xtend(config.graf, opts)
  var bufferSize = typeof opts.bufferSize !== 'undefined' ? opts.bufferSize : 50

  var cache = Cache(bufferSize)
  var server = http.createServer(ecstatic).listen(opts.port)
  var ts = through()

  if (cache.isEnabled()) {
    ts.on('data', function (data) {
      cache.push(data)
    })
  }

  var sock = shoe(function (stream) {
    var history = cache.getValues()
    history.forEach(function (value) {
      stream.write(value)
    })

    ts.pipe(stream)
  })

  sock.install(server, '/sock')

  return ts
}


