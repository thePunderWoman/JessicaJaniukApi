import bcrypt from 'bcrypt';

export class PasswordHelper {
  constructor() {}

  cryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }
}

export default new PasswordHelper();
