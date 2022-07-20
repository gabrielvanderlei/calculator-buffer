const {
    PORT,
    HOST,
    serverLog,
    Marshaller,
    UnMarshaller
} = require('../lib/configuration');

const {
    processOperation,
    isOperation
} = require('../lib/operations');

try {
    let dgram = require('dgram');
    let server = dgram.createSocket('udp4');

    let sendToPort = (port, server, message) => {
        let bufferMessage = Buffer.from(message);

        server.send(bufferMessage, port, HOST, function (error) {
            if (error) {
                client.close();
            } else {
                serverLog(`Data sent: ${message}`);
            }
        });
    }

    let processCommand = (clientMessage, server, port) => {
        let messageSplitted = clientMessage.split(' ');
        let command = messageSplitted.shift();
        let message = messageSplitted.join(' ');

        if (isOperation(command)) {
            const {
                finalResult,
                allInputsValid
            } = processOperation(command, message);

            if (allInputsValid) {
                sendToPort(port, server, Marshaller({ command, n1: finalResult }));
            }
        }
    }

    server.on('listening', function () {
        var address = server.address();
        var port = address.port;
        serverLog(`Server on ${HOST}:${port}`);
    });

    server.on('message', function (msg, info) {
        let messageFromClient = msg.toString();
        serverLog('Data received from client : ' + messageFromClient);
        serverLog(`Received ${msg.length} bytes from ${info.address}:${info.port}`);

        const messageObject =  UnMarshaller(msg);
        const messageFormat = `${messageObject.command} ${messageObject.n1} ${messageObject.n2}`;
        processCommand(messageFormat, server, info.port);
    });

    server.on('error', function (error) {
        serverLog('Error: ' + error);
        server.close();
    });

    server.bind(PORT);
} catch (e) {
    console.log("Error running the client, please verify if the server is online.")
}