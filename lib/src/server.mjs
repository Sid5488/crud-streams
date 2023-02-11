import http from "http";

import { Router } from "./route.mjs";
import { readRequest } from "./helpers/requestBodyHelper.mjs";
import { readQueryParams } from "./helpers/queryParamsHelper.mjs";
import { request, response } from "./interfaces/interfaceServer.mjs";

/**
 * Class to start server and listen for requests.
*/
class Server {
  #request = request;
  #response = response;

  constructor() {
    console.log("Init server...");
  }

  /**
   * Init server and return a listener request events.
   * @returns @type {http.createServer}
  */
  init() {
    const server = http.createServer(
      async (request, response) => await this.requester(request, response)
    );

    return server;
  }

  /**
   * Request listener that's mapping routes from application.
   * @param {http.IncomingMessage} request
   * @param {http.ServerResponse} response 
  */
  async requester(request, response) {
    this.#response = response;
    this.#request = {
      ...request,
      body: await readRequest(request),
      query: await readQueryParams(request),
    };

    Router.router(this.#request, this.#response);
  }
}

export { Server };
