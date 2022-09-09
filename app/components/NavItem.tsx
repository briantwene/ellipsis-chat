import React from "react";
import { NavLink } from "@remix-run/react";

const NavItem = ({ item: { path, icon, title } }) => {
  const baseStyle =
    "flex items-center justify-center p-2 my-4 rounded-lg cursor-pointer text-2xl";
  const activeStyle = `${baseStyle} cursor-pointer bg-blue-500 text-white`;
  return (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to={path}
          end={true}
        >
          {icon}
        </NavLink>
      </li>
    </>
  );
};

export default NavItem;
