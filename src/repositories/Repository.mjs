import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

import { __dirname } from "../helpers/__dirname.mjs";

/**
 * Access data from selected model.
 * This class is for manipulating data in the selected model.
*/
class Repository {
  #repositoryFile;

  /**
   * Load data list from model.
   * 
   * It's must be a filename from model that's you 
   * wish manipulate data.
   * 
   * The filename must be it's were on src/database folder and your extension 
   * must be .json.
   * @param {string} filename
  */
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

  /**
   * Method that return data list from selected model.
   * @returns {Array<any>}
  */
  getAll() {
    const data = JSON.parse(
      readFileSync(this.#repositoryFile, {
        encoding: "utf-8",
        flag: "r",
      })
    );

    return data;
  }

  /**
   * Method that return one data from selected model.
   * @param {any} model
   * @returns {any}
  */
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

      if (result !== null && result !== undefined)
        if (result[key] === model[key]) return result[key];
    });

    return datas[0];
  }

  /**
   * Method to save data on selected model.
   * @param {any} model
  */
  save(model) {
    const data = Array.from(this.getAll());
    data.push(model);

    writeFileSync(this.#repositoryFile, JSON.stringify(data));
  }

  /**
   * Method to update data on selected model.
   * @param {any} model
   * @param {string} updateByKey
  */
  update(model, updateByKey) {
    const data = Array.from(this.getAll());

    const dataList = data.map((item) => {
      if (item !== null && model.id === item[updateByKey])
        return model;

      return item;
    });

    writeFileSync(this.#repositoryFile, JSON.stringify(dataList));
  }

  /**
   * Method to delete data on selected model.
   * @param {any} id
   * @param {string} deleteByKey
  */
  delete(id, deleteByKey) {
    const data = Array.from(this.getAll());

    const dataList = data.filter(
      (item) => item !== null && id !== item[deleteByKey]
    );

    writeFileSync(this.#repositoryFile, JSON.stringify(dataList));
  }
}

export { Repository };
