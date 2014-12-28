# upmon-graf

Graph [upmon](https://github.com/alanshaw/upmon) output.

<img src="https://raw.githubusercontent.com/alanshaw/upmon-graf/master/screenshot.png" width="636">

## Usage

```
npm install -g upmon upmon-graf
# (Configure upmon with services to ping)
upmon | upmon-graf
open http://localhost:5000
```

`upmon` emits [ndjson](http://ndjson.org/) so we can simply pipe the output into `upmon-graf` which in turn pipes that to each connected client's websocket.

