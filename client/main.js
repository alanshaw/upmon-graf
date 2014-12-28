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

      var s = series[data.url]

      if (!s) {
        return series[data.url] = chart.addSeries({
          name: urlToName(data.url),
          data: [data]
        })
      }

      if (data.status == 200) {
        if (s.options.color == 'red') {
          s.options.color = s.options._upmonColorOrig
          s.update(s.options)
        }
      } else {
        if (s.options.color != 'red') {
          s.options._upmonColorOrig = s.color
          s.options.color = 'red'
          s.update(s.options)
        }
      }

      s.addPoint(data, false, s.data.length > 20)
    })

  setInterval(function () {
    if (pointAdded) {
      chart.redraw()
      pointAdded = false
    }
  }, 1000)
})