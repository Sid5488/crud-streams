class Router {
  static #routes = [];

  static addRoute(route) {
    Router.#routes.push(route);
  }

  static getParams(requestedRoute, request) {
    let path = "";

    Object.keys(this.#routes).forEach(key => {
      const partialPath = key.split("/");
      const partialRequestPath = requestedRoute.split("/");

      partialPath.shift();
      partialRequestPath.shift();

      let foundRoute = true;
      for(let i in partialPath) {
        if(partialPath.length === partialRequestPath.length) {
          if(partialPath[i].includes("$")) {
            const [, paramKey] = partialPath[i].split("$");
            const value = partialPath[i].replace(/^\$.*/, partialRequestPath[i]);

            request["params"] = value.toString();
            path += `/$${paramKey}`;
          } else {
            if(partialPath[i] !== partialRequestPath[i]) {
              foundRoute = false;
              path = "";

              break;
            } else {
              foundRoute = true;
              path += `/${partialPath[i]}`;
            }
          }
        }
      }

      if(foundRoute) 
        return { message: "Page not found", status: 404 };
    });

    return path;
  }

  static router(request, response) {
    Router.#routes.map(route => {
      if(route.path !== request.url)
        return { message: "Page not found", status: 404 };

      route.method(request, response);
    });
  }
}

export { Router };
