import logEvents from "./logEvents";

export const errLogger = (error) => {
    logEvents(`${error.name}\t${error.message}`, 'errorLogs.txt');
};