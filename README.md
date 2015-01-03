# upmon-graf

Graph [upmon](https://github.com/alanshaw/upmon) output.

<img src="https://raw.githubusercontent.com/alanshaw/upmon-graf/master/screenshot.png" width="636">

## Getting started

1. `npm install -g upmon upmon-graf`
2. Create a new `$HOME/.upmonrc` file and add config:

    ```js
    {
      "ping": {
        // Time in ms between pings
        "interval": 5000,
        // URL's of services to ping
        "services": ["http://localhost:8000/"]
      },
      "graf": {
        // Port to run graf server on
        "port": 5000
      }
    }
    ```

3. `upmon | upmon-graf`
4. `open http://localhost:5000`

## Build your own monitor

Want to run upmon from [boss](https://www.npmjs.com/package/process-boss) or [pm2](https://www.npmjs.com/package/pm2)?

Create a new project, add a `.upmonrc` config file, install the upmon modules you need, and pipe them together!

**monitor.js**
```js
var upmon = require('upmon')
var sms = require('upmon-sms')
var graf = require('upmon-graf')

upmon().pipe(sms()).pipe(graf()).pipe(process.stdout)
```

```sh
pm2 start monitor.js
```

