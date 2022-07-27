import { ConnectionDatasource } from "../helpers/conDatasource.mjs";
import { __dirname } from "../helpers/__dirname.mjs";

class UserResource {
  #connectionDatasource = new ConnectionDatasource();

  getAll() {
    const file = __dirname + "/src/database/users.json";

    const users = this.#connectionDatasource.connection(file);
    return users;
  }
}

export { UserResource };
