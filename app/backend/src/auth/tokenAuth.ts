import { sign, Secret, verify, JwtPayload } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import UserModel from '../models/user.model';

export default class TokenAuth {
  static compare(token: string, password: string): boolean {
    return compareSync(password, token);
  }

  static encrypt(user: UserModel): string {
    const secret = process.env.JWT_SECRET as Secret;
    const token = sign({ data: user }, secret);

    return token;
  }

  static decrypt(token: string) {
    const secret = process.env.JWT_SECRET as Secret;
    const decypted = verify(token, secret);

    return decypted as JwtPayload;
  }
}
