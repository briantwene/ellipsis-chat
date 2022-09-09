import React, { ReactNode } from "react";

//can look at how to make a button component later

type Props = {
  title?: string;
  mode?: string;
  icon: ReactNode;
};
const Button = ({ title, mode, icon }: Props) => {
  return (
    <button
      className="flex items-center justify-center w-12 h-12 my-5 rounded-full bg-slate-100"
      type={mode}
    >
      {icon}
    </button>
  );
};

export default Button;
