import { Auth } from "@/utils/api/auth";
import { ref, Ref } from "@vue/reactivity";

interface UserCredentialsSignUp {
  username: string;
  email: string;
  fullName: string;
  password: string;
}

interface UserCredentialsLogin {
  email: string;
  password: string;
}

interface UseSignUp {
  credentials: Ref<UserCredentialsSignUp>;
  onSubmit: () => void;
}

interface UseLogin {
  credentials: Ref<UserCredentialsLogin>;
  onSubmit: () => void;
}

export const useSignUp = (): UseSignUp => {
  const credentials = ref({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });

  async function onSubmit(): Promise<void> {
    const { accessToken } = await Auth.signUp(credentials.value);
    console.log(accessToken);
  }

  return {
    credentials,
    onSubmit,
  };
};

export const useLogin = (): UseLogin => {
  const credentials = ref({
    email: "",
    password: "",
  });

  async function onSubmit(): Promise<void> {
    const { accessToken } = await Auth.login(credentials.value);
    console.log(accessToken);
  }

  return {
    credentials,
    onSubmit,
  };
};
