import bcrypt from "bcrypt";

class Hash {
  public hash(payload: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(payload, 10, (err, encrypted) => {
        if (err) return reject(err);
        resolve(encrypted);
      });
    });
  }
}

export const hash = new Hash();
