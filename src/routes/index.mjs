import { UserResource } from "../resources/userResource.mjs";

class Routes {
  #userResource;
  #routes;
  
  constructor(request, response) {
    this.#userResource = new UserResource(request, response);
    this.#configurationRoutes();
  }

  #configurationRoutes() {
    this.#routes = {
      "/api/users": {
        "GET": () => this.#userResource.getAll(),
      },
      "/api/users/sign-up": {
        "POST": () => this.#userResource.signUp(),
      }
    };
  }

  #identifierRoutes(route) {
    const path = this.#routes[route.url];

    if(!path || !`${path}/`)
      return { message: "Page not found" };

    const resourceMethod = path[route.method];

    return resourceMethod();
  }

  router(request, response) {
    const result = this.#identifierRoutes(request);

    return response.end(JSON.stringify(result));
  }
}

export { Routes };
