var shoe = require('shoe')
var JSONStream = require('JSONStream')
var graph = require('./graph')

function urlToName (url) {
  url = url.replace(/^https?:\/\//, '')
  url = url[url.length - 1] == '/' ? url.slice(0, -1) : url
  return url
}

graph.create('#container', {}, function (er, chart) {
  if (er) throw er

  var series = {}
  var pointAdded = false

  shoe('/sock')
    .pipe(JSONStream.parse())
    .on('data', function (data) {
      pointAdded = true

      data.x = data.timestamp
      data.y = data.rtt

      if (series[data.url]) {
        var shift = series[data.url].data.length > 20
        return series[data.url].addPoint(data, false, shift)
      }

      series[data.url] = chart.addSeries({
        name: urlToName(data.url),
        data: [data]
      })
    })

  setInterval(function () {
    if (pointAdded) {
      chart.redraw()
      pointAdded = false
    }
  }, 1000)
})