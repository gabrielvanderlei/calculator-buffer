const {
    PORT,
    HOST,
    clientLog,
    Marshaller,
    UnMarshaller
} = require('../lib/configuration');
const { isOperation } = require('../lib/operations');

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

        let command = messageSplitted[0];
        let n1 = messageSplitted[1];
        let n2 = messageSplitted[2];

        if (messageSplitted.length > 1) {
            client.send(Marshaller({ command, n1, n2 }), PORT, HOST, function (error) {
                if (error) {
                    clientLog(error);
                    client.close();
                } else {
                    clientLog('SENT');
                }
            });
        } else {
            clientLog(`Message format: [command] content. Example: + 1 1`)
        }
    });

    client.on("message", function (data) {
        let returnData = UnMarshaller(data);
        
        if(isOperation(returnData.command)){
            console.log(`[CLIENT] [${returnData.command}]: ${returnData.n1}`);
        }
    })

} catch (e) {
    console.log("Error running the client, please verify if the server is online.")
}