import { readRequest } from "../helpers/requestBodyHelper.mjs";
import { Repository } from "../repositories/Repository.mjs";
import { UserRules } from "../rules/userRules.mjs";

class UserResource {
  #repository = new Repository("users.json");
  #rules = new UserRules();

  #request;

  constructor(request) {
    this.#request = request;
  }

  getAll() {
    const users = this.#repository.getAll();

    return users;
  }

  async signUp() {
    const user = await readRequest(this.#request);

    const result = this.#rules.signUp(user);

    if(typeof result === 'undefined') return user;

    return { message: result };
  }
}

export { UserResource };
