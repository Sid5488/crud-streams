import { readFileSync, writeFileSync } from "fs";

import { __dirname } from "../helpers/__dirname.mjs";

class Repository {
  #repositoryFile;

  constructor(filename) {
    this.#repositoryFile = `${__dirname}/src/database/${filename}`;
  }
  
  getAll() {
    const data = JSON.parse(readFileSync(this.#repositoryFile, { 
      encoding: "utf-8", 
      flag: "r" 
    }));

    return data;
  }

  getOne(objectToFind) {
    if(!objectToFind) {
      throw new Error("Please send some data to get user");
    }

    const data = JSON.parse(readFileSync(this.#repositoryFile, { 
      encoding: "utf-8", 
      flag: "r" 
    }));
    
    const user = data.filter(result => {
      const key = Object.keys(objectToFind);

      if(result[key] === objectToFind[key]) {
        return result[key];
      }
    });
    
    return user[0];
  }

  save(objToSave) {
    const allUsers = Array.from(this.getAll());
    allUsers.push(objToSave);

    writeFileSync(this.#repositoryFile, JSON.stringify(allUsers));
  }
}

export { Repository };
