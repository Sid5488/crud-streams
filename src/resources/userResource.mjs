import { Repository } from "../repositories/Repository.mjs";
import { UserRules } from "../rules/userRules.mjs";

class UserResource {
  #repository = new Repository("users.json");
  #rules = new UserRules();

  #request;
  #response;

  constructor(request, response) {
    this.#request = request;
    this.#response = response;
  }

  getAll() {
    const users = this.#repository.getAll();

    return users;
  }

  signUp() {
    let body = '';

    this.#request.on('data', function (chunk) {
      body += chunk;
    });

    const aa = this.#request.on('end', () => {
      const user = JSON.parse(body);
      const result = this.#rules.signUp(user);
  
      if(!result) return this.#response.end(JSON.stringify(user));
  
      return this.#response.end(JSON.stringify(result));
    });
  }
}

export { UserResource };
