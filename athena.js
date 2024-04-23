const { WebSocketServer } = require('ws');
const { JSONRPCServer } = require("json-rpc-2.0");

function heartbeat() {
  this.isAlive = true;
}

const wss = new WebSocketServer({ port: 8080 });
const server = new JSONRPCServer();

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('error', console.error);
  ws.on('pong', heartbeat);

  ws.on('message', function message(data) {
    if (!server.hasMethod(JSON.parse(data).method)) {
      console.log('received: %s', data);
    }
    server.receive(data).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        ws.send(JSON.stringify(jsonRPCResponse));
      }
    });
  });

  // ws.send('something');
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
});

server.addMethod('forwardLogs', (params) => {
  console.log(params);
});

server.addMethod('storeStats', (params) => {
  console.log(params);
});
