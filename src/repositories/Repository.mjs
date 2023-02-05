import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

import { __dirname } from "../helpers/__dirname.mjs";

class Repository {
  #repositoryFile;

  constructor(filename) {
    if (process.platform === "linux") {
      this.#repositoryFile = join(
        __dirname,
        "../",
        "database",
        filename
      );
    } else {
      this.#repositoryFile = join(
        __dirname,
        "src",
        "database",
        filename
      );
    }
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
      throw new Error("Please send some data to get");
    }

    const data = JSON.parse(
      readFileSync(this.#repositoryFile, {
        encoding: "utf-8",
        flag: "r",
      })
    );

    const datas = data.filter((result) => {
      const key = Object.keys(model);

      if (result[key] === model[key]) {
        return result[key];
      }
    });

    return datas[0];
  }

  save(model) {
    const data = Array.from(this.getAll());
    data.push(model);

    writeFileSync(this.#repositoryFile, JSON.stringify(data));
  }

  update(model) {
    const data = Array.from(this.getAll());

    const dataList = data.map((user) => {
      if (model.id === user.id) {
        return model;
      }

      return user;
    });

    writeFileSync(this.#repositoryFile, JSON.stringify(dataList));
  }

  delete(id) {
    const data = Array.from(this.getAll());

    const dataList = data.map((user) => {
      if (id !== user.id) return user;
    });

    writeFileSync(this.#repositoryFile, JSON.stringify(dataList));
  }
}

export { Repository };
