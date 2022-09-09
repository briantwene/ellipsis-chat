import { Outlet, NavLink, Form } from "@remix-run/react";
import React from "react";
import { HiLogout } from "react-icons/hi";
import Button from "~/components/button";
import { settingMenuEnum } from "~/components/enums";
import NavSettingItem from "~/components/NavSettingItem";

const settings = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-1/5 border-r">
        <div className="flex flex-col  h-[15%] p-5">
          <h1 className="text-3xl font-semibold text-blue-500">Settings</h1>
        </div>

        <ul className="flex flex-col justify-start h-full p-2 grow">
          {settingMenuEnum.map((item, index) => (
            <NavSettingItem item={item} key={index} />
          ))}
        </ul>
        <Form className="m-5 " action="/logout" method="post">
          <button
            type="submit"
            className="flex items-center justify-center w-full p-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            <span>Logout</span>
          </button>
        </Form>
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

export default settings;
