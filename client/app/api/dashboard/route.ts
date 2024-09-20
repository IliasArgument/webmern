// import { cookies } from "next/headers";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const user = cookieStore.get("currentUser")?.value;

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  const posts = data.slice(0, 4);
  return NextResponse.json({ data: posts });
};
