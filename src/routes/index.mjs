import { Router } from "../../lib/src/route.mjs";
import { UserResource } from "../resources/userResource.mjs";

class Routes {
  static #userResource = new UserResource();

  static routes() {
    Router.addRoute({
      path: "/api/users",
      httpMethod: "GET",
      method: (request, response) =>
        Routes.#userResource.getAll(request, response),
    });

    Router.addRoute({
      path: "/api/users/create-account",
      httpMethod: "POST",
      method: (request, response) =>
        Routes.#userResource.createAccount(request, response),
    });

    Router.addRoute({
      path: "/api/users/log-in",
      httpMethod: "POST",
      method: (request, response) =>
        Routes.#userResource.login(request, response),
    });

    Router.addRoute({
      path: "/api/users",
      httpMethod: "PUT",
      method: (request, response) =>
        Routes.#userResource.update(request, response),
    });

    Router.addRoute({
      path: "/api/users",
      httpMethod: "DELETE",
      method: (request, response) =>
        Routes.#userResource.delete(request, response)
    })
  }
}

export { Routes };
