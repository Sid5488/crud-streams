import { Router } from "../lib/route.mjs";
import { Server } from "../lib/server.mjs";

import { UserResource } from "./resources/userResource.mjs";
import { Routes } from "./routes/index.mjs";

class Application {
  env;

  constructor() {
    this.env = "DEVELOPMENT";
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
    const router = new Router();
    router.addRoute({ 
      path: '/api/users/create-account', 
      httpMethod: 'POST', 
      method: () => new UserResource().getAll(),
    });
    // new Routes(request, response).router(request, response);
  }
}

export { Application };
