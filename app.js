const {test} = require('./test'); // import test from
const { permute } = require("./permutation.js");
const winston = require('winston');
const logger = winston.createLogger({
    format: winston.format.simple(),
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

logger.info("test");
logger.log('warn', "127.0.0.1 - there's no place like home");