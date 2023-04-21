const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', ws => {
    ws.on('message', message => {
        websocketSendToAll(`${message}`);
        console.log(`Received message => ${message}`);
    })
    ws.send('Hello! Hello this is the welcome message from the server!!')
})

function websocketSendToAll(text) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(text);
        }
    });
}