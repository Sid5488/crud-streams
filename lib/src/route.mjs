class Router {
  static #routes = [];

  static addRoute(route) {
    Router.#routes.push(route);
  }

  static getParams(requestedRoute, request) {
    let tmp = "";

    Router.#routes.map(({ path }) => {
      if (requestedRoute === undefined) {
        return { message: "Page not found", status: 404 };
      }

      const partialPath = path.split("/");
      const partialRequestPath = requestedRoute.split("/");

      partialPath.shift();
      partialRequestPath.shift();

      let foundRoute = true;
      for (let i in partialPath) {
        if (partialPath.length === partialRequestPath.length) {
          if (partialPath[i].includes("$")) {
            const [, paramKey] = partialPath[i].split("$");
            const value = partialPath[i].replace(
              /^\$.*/,
              partialRequestPath[i]
            );

            request["params"] = value.toString();
            tmp += `/$${paramKey}`;
          } else {
            if (partialPath[i] !== partialRequestPath[i]) {
              foundRoute = false;

              tmp = "";

              break;
            } else {
              foundRoute = true;

              tmp += `/${partialPath[i]}`;
            }
          }
        }
      }

      if (foundRoute) return { message: "Page not found", status: 404 };
    });

    request["routeWithParams"] = tmp;
    return request;
  }

  static router(request, response) {
    Router.#routes.map((route) => {
      if (route.path !== request.url) {
        const foundRoute = Router.getParams(request.url, request);

        if (foundRoute.routeWithParams === route.path)
          route.method(foundRoute, response);

        return { message: "Page not found", status: 404 };
      }

      route.method(request, response);
    });
  }
}

export { Router };
