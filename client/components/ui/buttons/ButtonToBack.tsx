"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

const ButtonToBack = () => {
  const router = useRouter();
  return (
    <Button
      aria-label="Удалить студента"
      ariaLabel={""}
      className="rounded-lg p-2 bg-slate-500"
      onClick={() => router.push("/students")}
    >
      Go back!
    </Button>
  );
};

export default ButtonToBack;
