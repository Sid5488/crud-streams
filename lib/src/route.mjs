import { notFound } from "./helpers/notFoundMethodHelper.mjs";

class Router {
  static #routes = [];

  static addRoute(route) {
    Router.#routes.push(route);
  }

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
