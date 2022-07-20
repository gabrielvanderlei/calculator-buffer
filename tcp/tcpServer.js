const {
    PORT,
    HOST,
    serverLog,
    UnMarshaller ,
    getRandomId,
    Marshaller
} = require('../lib/configuration');

const {
    processOperation,
    isOperation
} = require('../lib/operations');

try {
    const netLib = require('net');
    const server = new netLib.Server();

    let allSockets = [];

    let processMessage = ({
        command,
        message
    }, socket) => {
        if (isOperation(command)) {
            const {
                finalResult,
                allInputsValid
            } = processOperation(command, message);

            if (allInputsValid) {
                socket.write(Marshaller({ command, n1: finalResult }));
            }
        }

        if (command == 'name') {
            socket.name = message;
            serverLog(`[ACTION] ${socket.id} has the username ${message}`, {
                isDebugOnly: true
            });
        }
    }

    server.listen(PORT, function () {
        serverLog(`Server on ${HOST}:${PORT}`);
    });

    server.on('connection', function (socket) {
        let id = getRandomId();
        serverLog(`New client!`, {
            isDebugOnly: true
        });

        socket.id = id;
        socket.write('You are connected');

        allSockets.push(socket);

        socket.on('data', function (chunk) {
            let receivedInfo = JSON.stringify(chunk.toJSON());

            serverLog(`Data received: ${receivedInfo}`, {
                isDebugOnly: true
            });

            try {
                const messageObject =  UnMarshaller(chunk);
                
                const messageFormat = {
                    command: messageObject.command,
                    message: `${messageObject.n1} ${messageObject.n2}`
                };

                processMessage(messageFormat, socket)
            } catch (e) {
                serverLog(`Error reading object: ${JSON.stringify(e)}`);
            }
        });

        socket.on('end', function () {
            serverLog(`Bye, ${socket.name} see you`, {
                isDebugOnly: true
            });
        });

        socket.on('error', function (err) {
            serverLog(`Error: ${err}`);
        });
    });
} catch (e) {
    console.log("Error running the server." + JSON.stringify(e))
}