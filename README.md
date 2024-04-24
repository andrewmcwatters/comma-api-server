# comma-api-server
A drop-in replacement for `api.commadotai.com` in commaai/openpilot

## Recommended VPS provider
* [RackNerd](https://my.racknerd.com/aff.php?aff=2502)

## Installing
### Node.js
```sh
cd comma-api-server
npm install --omit=dev
```

### pm2
```sh
npm install pm2 -g
cd comma-api-server
NODE_ENV=production PORT=80 pm2 start bin/www --name comma-api-server --watch --ignore-watch="\.git node_modules"
pm2 startup
pm2 save
```

## Dependencies
* [InfluxDB v2.7.6](https://www.influxdata.com/downloads/)

## See also
* https://github.com/florianbrede-ayet/retropilot-server
* https://github.com/mbalesni/openpilot-pipeline

## License
GNU Affero General Public License v3.0
