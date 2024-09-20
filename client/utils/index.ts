import { IUser } from "@/types/User";
import { cookies } from "next/headers";

export const getParsedUserCookie = (cookieName: string): IUser | null => {
  const cookieValue = cookies().get(cookieName)?.value;
  console.log(cookieValue, 'cookieValue')
  if (cookieValue) {
    try {
      return JSON.parse(cookieValue) as IUser;
    } catch (error) {
      console.error(`Error parsing cookie "${cookieName}":`, error);
    }
  }
  return null;
};