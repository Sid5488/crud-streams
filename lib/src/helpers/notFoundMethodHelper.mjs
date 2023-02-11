import { request, response } from "../interfaces/interfaceServer.mjs";

/**
 * This method must be used when route not found.
 * @param {request} _
 * @param {response} response 
 * @returns {response}
 */
const notFound = (_, response) => {
  response.statusCode = 404;

  return response.end({ message: 'not found' });
};

export { notFound };