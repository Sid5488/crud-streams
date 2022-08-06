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
    const data = JSON.parse(readFileSync(this.#repositoryFile, { 
      encoding: "utf-8", 
      flag: "r" 
    }));
    
    if(!objectToFind) {
      data.filter(result => result[objectToFind] === objectToFind[objectToFind])
      
      return data[0];
    }

    return undefined;
  }

  save(objToSave) {
    const allUsers = Array.from(this.getAll());
    allUsers.push(objToSave);

    writeFileSync(this.#repositoryFile, JSON.stringify(allUsers));
  }
}

export { Repository };
