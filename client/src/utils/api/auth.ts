interface Response {
  accessToken: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

export class Auth {
  static async signUp(creds: SignUpCredentials): Promise<Response> {
    console.log(creds);
    return {
      accessToken: "hello world",
    };
  }

  static async login(creds: LoginCredentials): Promise<Response> {
    console.log(creds);
    return {
      accessToken: "hello world",
    };
  }
}
