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

  public compare(encrypted: string, plainText: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, encrypted, (err, same) => {
        if (err) return reject(err);

        resolve(same);
      });
    });
  }
}

export const hash = new Hash();
