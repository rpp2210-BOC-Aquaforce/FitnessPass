// eslint-disable-next-line import/no-extraneous-dependencies
import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPass = await hash(password, 15);
  return hashedPass;
}

export async function checkPassword(password: string, hashedPassword: string) {
  const validPass = await compare(password, hashedPassword);
  return validPass;
}
