import bcrypt from 'bcrypt';

export class PasswordHelper {
  constructor() {
    this.cryptPassword = this.cryptPassword.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
  }

  cryptPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }
}

export default new PasswordHelper();
