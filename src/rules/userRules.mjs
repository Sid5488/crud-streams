import { stringToHash } from "../helpers/hashingHelper.mjs";
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

    this.#repository.save(user);
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
}

export { UserRules };
