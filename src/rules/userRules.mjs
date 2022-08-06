import { Repository } from "../repositories/Repository.mjs";

class UserRules {
  #repository = new Repository("users.json");
  
  signUp(user) {
    const emailAlreadyInUse = this.#repository.getOne({
      email: user.email
    });

    if(emailAlreadyInUse)
      return "Email already in use";

    this.#repository.save(user);
  }
}

export { UserRules };
