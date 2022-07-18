const {
    PORT,
    HOST,
    clientLog
} = require('../lib/configuration');

try {
    let dgram = require('dgram');
    let client = dgram.createSocket('udp4');

    const readline = require('readline');
    const rl = readline.createInterface(process.stdin, process.stdout);

    clientLog(`Message format: [command] content.`)
    clientLog(``)
    clientLog(`Command examples.`)
    clientLog(`> sum 1 1`)
    clientLog(`> + 1 1`)
    clientLog(`> subtraction 1 1`)
    clientLog(`> - 1 1`)
    clientLog(`> division 1 1`)
    clientLog(`> / 1 1`)
    clientLog(`> multiplication 1 1`)
    clientLog(`> * 1 1`)
    clientLog(`> quit now`)
    clientLog(``)


    rl.on('line', (message) => {
        let messageSplitted = message.split(' ');

        if (messageSplitted.length > 1) {
            client.send(message, PORT, HOST, function (error) {
                if (error) {
                    clientLog(error);
                    client.close();
                } else {
                    clientLog('SENT');
                }
            });
        } else {
            clientLog(`Message format: [command] content. Example: message hi`)
        }
    });

    client.on("message", function (data) {
        clientLog(data);
    })

} catch (e) {
    console.log("Error running the client, please verify if the server is online.")
}