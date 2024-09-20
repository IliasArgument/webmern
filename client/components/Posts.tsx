'use client'
import React from "react";

const Posts = ({ posts }: any) => {
  return (
    <div className="w-full h-full flex flex-col text-slate-800">
      <ul className="pt-5 flex flex-col">
        {
          posts?.map((post: any) => (
            <li key={post.id}>{post.title}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default Posts;
