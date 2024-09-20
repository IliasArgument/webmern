import React from "react";
import { dataCollection } from "../constants/data";
import Link from "next/link";

const CollectionsList = () => {
  return (
    <div className="w-full flex items-start relative">
      <ul className="flex">
        {dataCollection.map((data) => (
          <li className="rounded-md p-3 m-5 bg-cyan-900" key={data.title}>
            <Link href={data.path}>
              <h3 className="text-gray-400font-medium cursor-pointer">
                {data.title}
              </h3>
              <span>{data.length}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsList;
