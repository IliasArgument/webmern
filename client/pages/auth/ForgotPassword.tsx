"use client";
import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { InputRequired } from "@/components/ui/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/services/auth.service";
import { showToast } from "@/utils/toast";
import { IUserAuth } from "@/types/User";
import HeadingAuth from "@/components/ui/heading/HeadingAuth";
import CheckEmailPopup from "@/components/ui/popups/CheckEmailPopup";

const ForgotPassword = () => {

  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserAuth>();

  const onSubmit: SubmitHandler<IUserAuth> = async (data: IUserAuth) => {
    const { email } = data;
    try {
      // Успешный вход
      const result = await forgotPassword(email);
      if (result) {
        setShowPopup(true);
      }
    } catch (error: any) {
      showToast("error", <p>{error?.message!} </p>);
    }
  };

  return (
    <AuthLayout>
      <HeadingAuth title="Recover Password" />
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
      <CheckEmailPopup show={showPopup} />;
    </AuthLayout>
  );
};

export default ForgotPassword;
