import Login from "@/pages/auth/Login";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full h-lvh">
      <Login />
    </div>
  );
};

export default SignIn;
