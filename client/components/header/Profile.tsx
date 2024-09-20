"use client";
import React, { FC } from "react";
import { IProfile } from "@/types/User";

const Profile: FC<IProfile> = ({ email }) => {
  return (
    <span className="text-cyan-900 font-bold hidden sm:block text-lg md:text-2xl">
      {email}
    </span>
  );
};

export default Profile;
