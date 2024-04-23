const { WebSocketServer } = require('ws');
const { JSONRPCServer, createJSONRPCErrorResponse } = require("json-rpc-2.0");

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
    server.receive(JSON.parse(data)).then((jsonRPCResponse) => {
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

// next will call the next middleware
const logMiddleware = (next, request, serverParams) => {
  console.log(`Received ${JSON.stringify(request)}`);
  return next(request, serverParams).then((response) => {
    console.log(`Responding ${JSON.stringify(response)}`);
    return response;
  });
};

const exceptionMiddleware = async (next, request, serverParams) => {
  try {
    return await next(request, serverParams);
  } catch (error) {
    if (error.code) {
      return createJSONRPCErrorResponse(request.id, error.code, error.message);
    } else {
      throw error;
    }
  }
};

// Middleware will be called in the same order they are applied
server.applyMiddleware(logMiddleware, exceptionMiddleware);

server.addMethod('forwardLogs', (params) => {
  console.log(params);
});

server.addMethod('storeStats', (params) => {
  console.log(params);
});
