var shoe = require('shoe')
var inject = require('reconnect-core')
var JSONStream = require('JSONStream')
var graph = require('./graph')

require('./theme')

function urlToName (url) {
  url = url.replace(/^https?:\/\//, '')
  url = url[url.length - 1] == '/' ? url.slice(0, -1) : url
  return url
}

graph.create('#container', {}, function (er, chart) {
  if (er) throw er

  var series = {}
  var pointAdded = false

  var reconnect = inject(function () {
    return shoe.apply(null, arguments)
  })

  reconnect(function (stream) {
    stream.pipe(JSONStream.parse()).on('data', onData)
  }).connect('/sock')

  function onData (data) {
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
        s.legendItem.css({color: Highcharts.theme.legend.itemStyle.color})
      }
    } else {
      if (s.options.color != 'red') {
        s.options._upmonColorOrig = s.color
        s.options.color = 'red'
        s.update(s.options)
        s.legendItem.css({color: 'red'})
      }
    }

    s.addPoint(data, false, s.data.length > 20)
  }

  setInterval(function () {
    if (pointAdded) {
      chart.redraw()
      pointAdded = false
    }
  }, 1000)
})