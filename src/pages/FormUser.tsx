import api from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultMessageError, MessageError } from "@/types/IMessageError";
import { defaultUser, User, userInValidationSchema } from "@/types/IUser";
import { Formik, Field, Form, ErrorMessage } from "formik"; // Importando Formik
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormUser() {
  const [user, setUser] = useState<User>(defaultUser);
  const [messageError, setMessageError] =
    useState<MessageError>(defaultMessageError);
  const navigate = useNavigate();

  const hanlderSingIn = async (values: User) => {
    await api
      .post("user", values)
      .then(() => {
        console.log("Usuario Cadastrado com sucesso.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessageError({
          ...messageError,
          message: err.response.data.message,
          status: true,
        });
      });
  };
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <div>
        <Formik
          initialValues={user}
          validationSchema={userInValidationSchema}
          onSubmit={hanlderSingIn}
        >
          <Form className="flex flex-col gap-6 w-150">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Criar uma conta</h1>
              <p className="text-balance text-sm text-muted-foreground">
                Digite seu e-mail abaixo para acessar sua conta
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  id="email"
                  type="email"
                  name="username"
                  as={Input}
                  placeholder="m@example.com"
                  required
                />
                <span className="text-red-500">
                  {messageError.status ? messageError.message : ""}
                </span>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Field
                  id="name"
                  type="name"
                  name="name"
                  as={Input}
                  placeholder="Nome completo"
                  required
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Field
                  id="password"
                  name="password"
                  as={Input}
                  type="password"
                  required
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeatepassword">Repita a senha</Label>
                <Field
                  id="repeatepassword"
                  name="repeatepassword"
                  as={Input}
                  type="password"
                  required
                />
                <ErrorMessage
                  name="repeatepassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
