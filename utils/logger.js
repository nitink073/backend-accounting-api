const winston = require("winston")

const logger = winston.createLogger({
    level:"info",
    format: winston.format.json(),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:"error.log",level:"error"}),
        new winston.transports.file({filename:"combined.log"})
    ]
})

module.exports = logger