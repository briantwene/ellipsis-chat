import React from "react";
import Button from "./button";
import { Form } from "@remix-run/react";
import { userMenuEnum } from "./enums";
import * as HiIcons from "react-icons/hi";
import NavItem from "./NavItem";

const Navigation = ({ avatar }) => {
  return (
    <div className=" border w-[5%] flex flex-col justify-between">
      <ul className="flex flex-col items-center my-10 h-1/2">
        {userMenuEnum.map((item, index) => (
          <NavItem item={item} key={index} />
        ))}
      </ul>
      <div className="flex items-center justify-center my-5">
        <img
          className="w-12 h-12 mx-2 bg-green-100 rounded-full"
          src={avatar}
          alt="your avatar"
        />
      </div>
    </div>
  );
};

export default Navigation;
