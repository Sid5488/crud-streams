import { notFound } from "./helpers/notFoundMethodHelper.mjs";
import { addRoutes } from "./interfaces/interfaceRoutes.mjs";
import { request, response } from "./interfaces/interfaceServer.mjs";

/**
 * Class to manager your routes, you can add or found route to requested from 
 * server.
*/
class Router {
  static #routes = [];

  /**
   * Method to map application routes;
   * This is add route on routes array.
   * @param {addRoutes} route
  */
  static addRoute(route) {
    Router.#routes.push(route);
  }

  /**
   * Method to found route.
   * @param {request} request
   * @param {response} response
  */
  static router(request, response) {
    let found = false;

    Router.#routes.forEach(async route => {
      const [path] = request.url.split('?');

      if (route.path === path && route.httpMethod === request.method) {
        route.method(request, response);

        found = true;
      }
    });

    if (!found) notFound(request, response);
  }
}

export { Router };
