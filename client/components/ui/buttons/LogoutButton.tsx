"use client";
import React, { FC } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { Logout } from "@/services/auth.service";
import { useMutation } from "react-query";
import $api from "@/http";
import axios from "axios";

const LogoutButton = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: Logout,
    onError: (error, variables, context) => {
      console.log(`rolling back optimistic update with `);
    },
    onSuccess: (data, variables, context) => {
      localStorage.removeItem("user");
      router.push("/auth/signin");
      router.refresh();
    },
  });

  const onLogout = () => {
    mutation.mutate();
  };

  // const LogOut = async () => {
  //  try {
  //   const response = await Logout()
  //   localStorage.removeItem("user");
  //   router.push("/auth/signin");
  //   router.refresh();
  //   return response
  //  } catch(e) {
  //   console.log('bad request', e)
  //  }
  // };
  return (
    <Button
      color="primary"
      onClick={onLogout}
      aria-label="Logout"
      text="logout"
      type="button"
      ariaLabel={""}
    >
      LogOut
    </Button>
  );
};

export default LogoutButton;
