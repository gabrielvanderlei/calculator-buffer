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
    return Buffer.from([ commandChar, n1, n2 ]);
}

const UnMarshaller = (bufferData) => {
    return {
        command: String.fromCharCode(Number(bufferData[0])),
        n1: bufferData[1],
        n2: bufferData[2],
    };
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