import { stringToHash } from "../helpers/hashingHelper.mjs";
import { UserModel } from "../models/userModel.mjs";
import { Repository } from "../repositories/Repository.mjs";

class UserRules {
  #repository = new Repository("users.json");
  
  signUp(user) {
    const emailAlreadyInUse = this.#repository.getOne({
      email: user.email
    });

    if(emailAlreadyInUse)
      return "Email already in use";

    user.password = stringToHash(user.password, "md5", "mine_password", "hex");
    const model = new UserModel({ ...user });

    this.#repository.save(model);
  }

  login(user) {
    const userExists = this.#repository.getOne({
      email: user.email
    });

    if(!userExists)
      return "Email/password is wrong!";

    const password = stringToHash(user.password, "md5", "mine_password", "hex");
    
    if(password !== userExists.password)
      return "Email/password is wrong!";
  }

  update(id, data) { 
    const userExists = this.#repository.getOne({
      id: id
    });

    if(!userExists)
      return "User not found!";

    const subscribingData = {
      ...userExists,
      ...data
    };

    const user = new UserModel({ ...subscribingData });

    this.#repository.update(user);
  }
}

export { UserRules };
