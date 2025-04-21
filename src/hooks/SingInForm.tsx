import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import api from "../api/axiosInstance";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultSignIn, SingIn, singInValidationSchema } from "@/types/ISingIn"; // Importando a validação

import { Formik, Field, Form, ErrorMessage } from "formik"; // Importando Formik

export function SingInForm() {
  const [singIn, setSingIn] = useState<SingIn>(defaultSignIn);
  const navigator = useNavigate();

  // Função para fazer login
  const hanlderSingIn = async (values: SingIn) => {
    await api
      .post("auth", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigator("/home");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigator("/home");
    }
  }, [navigator]);

  return (
    <Formik
      initialValues={singIn} // Usando o estado inicial
      validationSchema={singInValidationSchema} // Aplica a validação
      onSubmit={hanlderSingIn} // Função de submit
    >
      <Form className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Entre na sua conta</h1>
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
              as={Input} // Usando o componente Input
              placeholder="m@example.com"
              required
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Esqueceu sua senha?
              </a>
            </div>
            <Field
              id="password"
              name="password"
              as={Input} // Usando o componente Input
              type="password"
              required
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="flex justify-center items-center text-center text-sm gap-2">
          Não tem uma conta?
          <a href="#" className="underline underline-offset-4">
            Cadastre-se
          </a>
        </div>
      </Form>
    </Formik>
  );
}
