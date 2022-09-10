import http from "http";

import { Routes } from "./routes/index.mjs";

class Server {
  hostname;
  server;
  port;
  env;

  constructor() {
    this.env = "DEVELOPMENT";

    this.configuration();
  }

  configuration() {
    this.hostname = '127.0.0.1'; // localhost == 127.0.0.1
    this.port = 3333;

    this.server = http.createServer((request, response) => {
      response.setHeader("Content-Type", "application/json");
      new Routes(request, response).router(request, response);
    });
  }
}

const app = new Server();

export { app };
