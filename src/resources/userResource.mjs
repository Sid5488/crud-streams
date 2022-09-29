// import { readRequest } from "../helpers/requestBodyHelper.mjs";
import { Repository } from "../repositories/Repository.mjs";
import { UserRules } from "../rules/userRules.mjs";

class UserResource {
  #repository = new Repository("users.json");
  #rules = new UserRules();

  getAll(request, response) {
    const users = this.#repository.getAll();

    response.statusCode = 200;
    return response.end(JSON.stringify({ result: users }));
  }

  async createAccount(request, response) {
    const user = request.body;
    const result = this.#rules.signUp(user);

    if(typeof result === 'string') {
      response.statusCode = 400;

      return response.end(JSON.stringify({ error: result }));
    }

    response.statusCode = 201;
    return response.end(JSON.stringify({ result: user }));
  }

  async login(request, response) {
    const requestBody = request.body;
    const logIn = this.#rules.login(requestBody);

    if(typeof logIn === 'string') {
      response.statusCode = 400;

      return response.end(JSON.stringify({ error: logIn }));
    }

    return response.end(JSON.stringify({ message: "Log in" }));
  }

  update(request, response) {
    console.log("request:", request);
  }
}

export { UserResource };
