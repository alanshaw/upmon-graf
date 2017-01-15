var Cache = function (bufferSize) {
  var buffer = []

  return {
    isEnabled: function () {
      return bufferSize > 0
    },

    getValues: function () {
      return buffer.slice()
    },

    push: function (el) {
      buffer.push(el)

      if (buffer.length > bufferSize) {
        buffer.shift()
      }
    }
  }
}

module.exports = Cache
