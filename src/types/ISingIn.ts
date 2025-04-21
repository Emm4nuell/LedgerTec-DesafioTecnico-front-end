import * as Yup from "yup";

export interface SingIn {
  username: string;
  password: string;
}

export const defaultSignIn: SingIn = {
  username: "",
  password: "",
};

export const singInValidationSchema = Yup.object({
  username: Yup.string()
    .email("O e-mail deve ser válido")
    .required("O nome de usuário é obrigatório"),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(3, "A senha deve ter pelo menos 6 caracteres"),
});
