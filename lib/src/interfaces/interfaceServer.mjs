import http from "http";

/** @type {http.IncomingMessage} */
const request = http.IncomingMessage;
/** @type {http.ServerResponse} */
const response = http.ServerResponse;

export { request, response };
