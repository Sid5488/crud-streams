class Router {
  #request;
  #response;

  #routes = [];

  constructor(request, response) {
    this.#request = request;
    this.#response = response;

    this.#router();
  }

  addRoute(route) {
    this.#routes.push(route);
  }

  #router() {
    this.#routes.map(route => {
      if(route.path !== this.#request.url)
        return { message: "Page not found", status: 404 };

      const resourceMethod = route.method();

      return this.#response.end(JSON.stringify(resourceMethod));
    });
  }
}

export { Router };
