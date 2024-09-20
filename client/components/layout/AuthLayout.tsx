import React, { FC } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  //h-lvh
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-gray-400 w-[400px] max-w-full p-5">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
