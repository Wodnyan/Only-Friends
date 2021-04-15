import argon2 from "argon2";

export class Encrypt {
  public static encrypt(plainText: string) {
    return argon2.hash(plainText);
  }

  public static verify(plainText: string, encrypted: string) {
    return argon2.verify(encrypted, plainText);
  }
}
