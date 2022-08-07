import { UserResource } from "../resources/userResource.mjs";

class Routes {
  #userResource;
  #routes;
  
  constructor(request, response) {
    this.#userResource = new UserResource(request, response);
    this.#configurationRoutes();
  }

  /**
   * Defines all routes of project.
   */
  #configurationRoutes() {
    this.#routes = {
      "/api/users": {
        "GET": () => this.#userResource.getAll(),
      },
      "/api/users/sign-up": {
        "POST": () => this.#userResource.signUp(),
      },
      "/api/users/log-in": {
        "POST": () => this.#userResource.login(),
      },
      "/api/users/{id}": {
        "PUT": () => this.#userResource.update(),
      }
    };
  }

  /**
   * @param {HttpRequest} route, used to get URL and HTTP Method to identify 
   * what method went requested 
   * @returns the values from method requested.
  */
  async #identifierRoutes(route) {
    const [path] = this.#routes[route.url];

    if(!path || !`${path}/`)
      return { message: "Page not found", status: 404 };

    const resourceMethod = path[route.method];

    return await resourceMethod();
  }

  async router(request, response) {
    const result = await this.#identifierRoutes(request);

    if(result !== undefined) {
      response.statusCode = result.status;
      delete result.status;
      
      return response.end(JSON.stringify(result));
    } else {
      response.statusCode = 500;
      return response.end({ message: "Internal server error." });
    }
  }
}

export { Routes };
