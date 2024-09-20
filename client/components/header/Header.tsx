import Link from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import LogoutButton from "../ui/buttons/LogoutButton";
import Profile from "./Profile";
import { IUser } from "@/types/User";
import { getParsedUserCookie } from "@/utils";

const Header = () => {
  const user: IUser| null  = getParsedUserCookie("currentUser");

  return (
    <header className="w-full fixed left-0 top-0 z-20 sm:p-5 p-2">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <span className="h-full flex items-center gap-2 cursor-pointer">
            <AiFillHome className="w-10 h-10" color="red" />
            <p className="text-slate-600 font-bold hidden md:block sm:text-3xl ">
              FULLSTACK-PR
            </p>
          </span>
        </Link>
        <div className="flex sm:items-center items-end ml-auto sm:gap-6 gap-2">
          {user ? (
            <>
              <Profile email={user.email} />
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href={"/auth/signin"}
                className="text-cyan-400 font-bold text-2xl uppercase"
              >
                login
              </Link>
              {/* <LogoutButton /> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
