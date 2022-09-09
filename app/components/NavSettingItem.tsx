import React from "react";
import { NavLink } from "@remix-run/react";

const NavSettingItem = ({ item: { path, icon, title } }) => {
  const baseStyle =
    "flex items-center  p-2 my-2 rounded-lg   cursor-pointer text-lg font-semibold";
  const style = `${baseStyle} hover:bg-slate-100`;
  const activeStyle = `${baseStyle} cursor-pointer bg-blue-500 text-white`;
  return (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : style)}
          to={path}
          end={true}
        >
          <span className="mr-3">{icon}</span> <span>{title}</span>
        </NavLink>
      </li>
    </>
  );
};

export default NavSettingItem;
