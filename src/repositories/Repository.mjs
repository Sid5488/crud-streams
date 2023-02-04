import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

import { __dirname } from "../helpers/__dirname.mjs";

class Repository {
  #repositoryFile;

  constructor(filename) {
    this.#repositoryFile = join(
      __dirname,
      "src",
      "database",
      filename
    );
  }

  getAll() {
    const data = JSON.parse(
      readFileSync(this.#repositoryFile, {
        encoding: "utf-8",
        flag: "r",
      })
    );

    return data;
  }

  getOne(model) {
    if (!model) {
      throw new Error("Please send some data to get user");
    }

    const data = JSON.parse(
      readFileSync(this.#repositoryFile, {
        encoding: "utf-8",
        flag: "r",
      })
    );

    const user = data.filter((result) => {
      const key = Object.keys(model);

      if (result[key] === model[key]) {
        return result[key];
      }
    });

    return user[0];
  }

  save(model) {
    const allUsers = Array.from(this.getAll());
    allUsers.push(model);

    writeFileSync(this.#repositoryFile, JSON.stringify(allUsers));
  }

  update(model) {
    const allUsers = Array.from(this.getAll());

    const userList = allUsers.map((user) => {
      if (model.id === user.id) {
        return model;
      }

      return user;
    });

    writeFileSync(this.#repositoryFile, JSON.stringify(userList));
  }
}

export { Repository };
