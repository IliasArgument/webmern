"use client";
import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { InputRequired } from "@/components/ui/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/buttons/Button";
import Link from "next/link";
import { Sign_up } from "@/services/auth.service";
import Cookies from "js-cookie";
import { AuthResponse, IUserAuth } from "@/types/User";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toast";
import HeadingAuth from "@/components/ui/heading/HeadingAuth";

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserAuth>();

  const onSubmit: SubmitHandler<IUserAuth> = async (data: IUserAuth) => {

    try {
      const result = (await Sign_up(data)) as unknown as AuthResponse;

      localStorage.setItem("user", JSON.stringify(result?.user));
      Cookies.set("currentUser", JSON.stringify(result?.user));
      showToast("success", <p>you are logged into the application </p>);
      router.push("/");
      router.refresh();
      reset();
      return result?.user;
    } catch (error: any) {
      showToast("error", <p>{error?.message!} </p>);
    }
  };

  return (
    <AuthLayout>
      <HeadingAuth title="register" />

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
          validation={{ min: 4, max: 99 }}
          errors={errors}
          id="password"
        />

        <InputRequired
          label="Name"
          register={register}
          name={"name"}
          validation={{ min: 3, max: 99 }}
          errors={errors}
          id="name"
        />
        <Button
          color="secondary"
          text="login"
          ariaLabel={"login"}
          type="submit"
        >
          REGISTER
        </Button>
      </form>
      <Link
        className="w-full text-center text-cyan-400 text-base font-bold inline-block py-5"
        href={"/auth/signin"}
      >
        SignIn
      </Link>
    </AuthLayout>
  );
};

export default Register;
