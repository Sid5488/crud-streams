import http from "http";

import { Router } from "./route.mjs";
import { readRequest } from "./helpers/requestBodyHelper.mjs";
import { readQueryParams } from "./helpers/queryParamsHelper.mjs";

class Server {
  #request;
  #response;

  constructor() {
    console.log("Init server...");
  }

  init() {
    const server = http.createServer(
      async (request, response) => await this.requester(request, response)
    );

    return server;
  }

  async requester(request, response) {
    this.#response = response;
    this.#request = {
      ...request,
      body: await readRequest(request),
      query: await readQueryParams(request),
      params: Router.getParams(request.url, request)
    };

    Router.router(this.#request, this.#response);
  }
}

export { Server };
