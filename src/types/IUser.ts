import * as Yup from "yup";

export interface User {
  name: string;
  username: string;
  password: string;
  repeatepassword?: string;
}

export const defaultUser: User = {
  name: "",
  username: "",
  password: "",
  repeatepassword: "",
};

export const userInValidationSchema = Yup.object({
  name: Yup.string().required("Campo nome é obrigatório"),
  username: Yup.string()
    .email("O e-mail deve ser válido")
    .required("O nome de usuário é obrigatório"),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(3, "A senha deve ter pelo menos 6 caracteres"),
  repeatepassword: Yup.string()
    .required("Repetir a senha é obrigatório")
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
});
