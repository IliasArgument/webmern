
import Posts from "@/components/Posts";

// import React, { useEffect, useState } from "react";
async function getPosts() {
  const res = await fetch("http://localhost:3000/api/dashboard");
  const data = await res.json();
  return data.data;
}

const Dashboard = async () => {
  const posts = await getPosts();


  let user = { email: "iliakoles98@gmail.com" };

  return (
    <div className="pt-20 w-full h-full flex justify-center items-center flex-col">
      <h1 className="font-bold text-slate-700">Dashboard</h1>
      <h2 className="font-bold text-slate-600">{user?.email}</h2>
      <Posts posts={posts} />
    </div>
  );
};

export default Dashboard;
