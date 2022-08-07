import { BaseModel } from "./baseModel.mjs";

class UserModel extends BaseModel {
  name;
  email;
  password;
  age;
  birthDate;

  constructor({ name, email, password, age, birthDate }) {
    if((name === undefined || name === "" || name === null) 
      || (email === undefined || email === "" ||email === null) 
      || (password === undefined || password === "" || password === null)) {
        throw new Error("UserModel is required values: name, emai and password");
    }

    super();

    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.birthDate = birthDate;
  }

  set name(name) {
    this.name = name;
  }

  get name() {
    return this.name;
  }

  set email(email) {
    this.email = email;
  }
  
  get email() {
    return this.email;
  }

  set password(password) {
    this.password = password;
  }

  get password() {
    return this.password;
  }

  set age(age) {
    this.age = age;
  }

  get age() {
    return this.age;
  }

  set birthDate(birthDate) {
    this.birthDate = birthDate;
  }

  get birthDate() {
    return this.birthDate;
  }
};

export { UserModel };
