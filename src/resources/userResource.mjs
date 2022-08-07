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

    if(typeof result === 'string') return { error: user, status: 400 };

    return { result: user, status: 201 };
  }

  async login() {
    const requestBody = await readRequest(this.#request);
    const logIn = this.#rules.login(requestBody);

    if(typeof logIn === 'string') return { error: logIn, status: 400 };

    return { message: "Log In", status: 200 };
  }

  update() {
    console.log("request:", this.#request);
  }
}

export { UserResource };
