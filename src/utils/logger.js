import log4js from "log4js";

const LOG_PATH = process.env.LOG_PATH || ".";

log4js.configure({
    appenders: {
        console: {
          type: "console"
        },
        access: {
            type: 'dateFile',
            filename: `${LOG_PATH}/access.log`,
            pattern: '-yyyy-MM-dd',
            backups: 3,
        },
        debug: {
            type: "dateFile",
            filename: `${LOG_PATH}/debug.log`,
            pattern: '-yyyy-MM-dd',
            backups: 3,
        }
    },
    categories: {
        default: { appenders: ['access', 'console'], level: 'ALL' },
        access: { appenders: ['access', 'console'], level: 'DEBUG' },
        debug: { appenders: ['debug', 'console'], level: 'DEBUG' },
    },
})

export const logger = log4js.getLogger("debug");
export const expressLogger = log4js.connectLogger(log4js.getLogger('access'), { level: log4js.levels.INFO })
