"use client";
import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { InputRequired } from "@/components/ui/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/buttons/Button";
import Link from "next/link";
import { resetPassword } from "@/services/auth.service";
import { showToast } from "@/utils/toast";
import { IResetPass, IUserAuth } from "@/types/User";
import HeadingAuth from "@/components/ui/heading/HeadingAuth";
import { useRouter, useParams } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams() as { id: string; token: string };
  const { id, token } = params;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserAuth>();

  const password = watch("password");

  const onSubmit: SubmitHandler<IResetPass> = async (data: IResetPass) => {
    const { password } = data;
    const newData = { id, token, password };
    try {
      // Успешный вход
      const result = await resetPassword(newData);
      if (result) {
        showToast("success", <p>Пароль успешно обновлен</p>);
        setTimeout(() => router.push("/auth/signin"), 1000);
      }
    } catch (error: any) {
      showToast("error", <p>{error?.message!} </p>);
    }
  };

  return (
    <AuthLayout>
      <HeadingAuth title="reset password" />

      <form
        action="#"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <InputRequired
          label="Password"
          register={register}
          name={"password"}
          type="password"
          validation={{
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters",
            },
            maxLength: {
              value: 99,
              message: "Password must be less than 99 characters",
            },
          }}
          errors={errors}
          id="password"
        />

        <InputRequired
          label="Repeat password"
          register={register}
          name={"repeat-password"}
          type="password"
          validation={{
            required: "Please repeat the password",
            validate: (value: string) =>
              value === password || "Passwords do not match",
          }}
          errors={errors}
          id="password"
        />

        <Button
          color="secondary"
          text="login"
          ariaLabel={"login"}
          type="submit"
        >
          SEND
        </Button>
      </form>
      <Link
        className="w-full text-center text-cyan-400 text-base font-bold inline-block py-5"
        href={"/auth/signin"}
      >
        Sign In
      </Link>
    </AuthLayout>
  );
};

export default ResetPassword;
