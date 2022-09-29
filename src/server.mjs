import { Server } from "../lib/src/server.mjs";

import { Routes } from "./routes/index.mjs";

class Application {
  env;

  constructor() {
    this.env = "PRODUCTION";
  }

  configuration(port, hostname, message) {
    const server = new Server();
    const serverService = server.init();

    if(port && hostname) {
      serverService.listen(port, hostname, message);
    }

    this.routes();
  }

  routes() {
    Routes.routes();
  }
}

export { Application };