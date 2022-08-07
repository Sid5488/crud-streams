import { generate } from "../helpers/generateUUID.mjs";

class BaseModel {
  id;
  createdAt;
  updatedAt;
  removeAt;

  constructor() {
    this.id = generate();
    this.createdAt = new Date();
  }
}

export { BaseModel }
