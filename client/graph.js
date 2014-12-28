var xtend = require('xtend')

exports.create = function (container, opts, cb) {
  container = $(container)

  if (!container.length) return setTimeout(function () {
    cb(new Error('Container not found'))
  })

  opts = opts || {}

  $(container).highcharts(xtend({
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
          cb(null, this)
        }
      }
    },
    title: {
      text: 'upmon'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'round trip time (ms)'
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
          Highcharts.numberFormat(this.y, 2)
      }
    },
    legend: {enabled: true},
    exporting: {enabled: false},
    series: []
  }, opts))
}