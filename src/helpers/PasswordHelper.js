import bcrypt from 'bcrypt';

export class PasswordHelper {
  constructor() {}

  cryptPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    console.log('salt: ' + salt);
    console.log('password: ' + password);

    return bcrypt.hashSync(password, salt);
  }

  comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }
}

export default new PasswordHelper();
