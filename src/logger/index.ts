import { pino } from 'pino';

export default pino({
    prettyPrint: {
        levelFirst: true,
        colorize: true
    }
});