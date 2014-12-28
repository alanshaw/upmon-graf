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
        var statusStyle = this.point.status == 200 ? '' : 'style="color:red;"'
        return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
          'Status: <b' + statusStyle + '>' + this.point.status + '</b><br/>' +
          'RTT: <b>' + Highcharts.numberFormat(this.y, 0) + 'ms</b>'
      }
    },
    legend: {enabled: true},
    exporting: {enabled: false},
    series: []
  }, opts))
}