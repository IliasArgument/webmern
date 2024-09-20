import React, { FC } from "react";

type IProps = {
  title: string;
};

const HeadingAuth: FC<IProps> = ({ title }) => {
  return (
    <h2 className="p-5 text-center text-cyan-400 font-bold text-2xl uppercase">
      {title}
    </h2>
  );
};

export default HeadingAuth;
