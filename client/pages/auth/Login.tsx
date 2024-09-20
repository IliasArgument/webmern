"use client";
import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { InputRequired } from "@/components/ui/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sign_in } from "@/services/auth.service";
import { showToast } from "@/utils/toast";
import Cookies from "js-cookie";
import { AuthResponse, IUserAuth } from "@/types/User";
import HeadingAuth from "@/components/ui/heading/HeadingAuth";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserAuth>();

  const onSubmit: SubmitHandler<IUserAuth> = async (data: IUserAuth) => {
    try {
      const result: AuthResponse = await Sign_in(data); // Pass the extracted properties
      localStorage.setItem("user", JSON.stringify(result?.user));
      Cookies.set("currentUser", JSON.stringify(result?.user));
      showToast("success", <p>you are logged into the application </p>);
      router.push("/");
      router.refresh();
      reset();
      return result?.user;
      // Успешный вход
    } catch (error: any) {
      showToast("error", <p>{error?.message!} </p>);
    }
  };

  return (
    <AuthLayout>
      <HeadingAuth title="login" />

      <form
        action="#"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <InputRequired
          label="Email"
          register={register}
          name={"email"}
          type="email"
          validation={{ min: 3, max: 99 }}
          errors={errors}
          id="email"
        />
        <InputRequired
          label="Password"
          register={register}
          name={"password"}
          type="password"
          validation={{ min: 6, max: 99 }}
          errors={errors}
          id="password"
        />
        <div className="flex gap-3">
          <Button
            color="secondary"
            text="login"
            ariaLabel={"login"}
            type="submit"
          >
            LOGIN
          </Button>
          <Link href={"/auth/forgot"} className="purple-link">
            Forgot password
          </Link>
        </div>
      </form>
      <Link
        className="w-full text-center text-cyan-400 text-base font-bold inline-block py-5"
        href={"/auth/signup"}
      >
        Create an account
      </Link>
    </AuthLayout>
  );
};

export default Login;
