const { commandToChar } = require("./operations");

const PORT = 4000;
const HOST = 'localhost';
const DEBUG = true;

const getRandomId = () => {
    const currentDate = +(new Date);
    const randomValue = Math.floor(Math.random() * currentDate);
    return `${currentDate}.${randomValue}`;
}

const serverLog = (message, options = {
    isDebugOnly: false
}) => {
    if (!options.isDebugOnly || (options.isDebugOnly && DEBUG)) {
        console.log(`[SERVER] ${message}`)
    }
};

const clientLog = (message, options = {
    isDebugOnly: false
}) => {
    if (!options.isDebugOnly || (options.isDebugOnly && DEBUG)) {
        console.log(`[CLIENT] ${message}`)
    }
};

const Marshaller = ({ command, n1, n2 }) => {
    const commandChar = String(commandToChar(command)).charCodeAt(0);

    let buf = Buffer.allocUnsafe(4 * 3);
    buf.writeFloatBE(commandChar, 0);
    buf.writeFloatBE(n1, 4);
    buf.writeFloatBE(n2, 4*2);
    
    return buf;
}

const UnMarshaller = (bufferData) => {
    let commandChar = bufferData.readFloatBE(0);
    let n1 = bufferData.readFloatBE(4);
    let n2 = bufferData.readFloatBE(4*2);
    
    let data = {
        command: String.fromCharCode(commandChar),
        n1,
        n2,
    };

    return data;
}

module.exports = {
    PORT,
    HOST,
    DEBUG,
    getRandomId,
    serverLog,
    clientLog,
    Marshaller,
    UnMarshaller
}