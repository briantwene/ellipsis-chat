import React from "react";
import Button from "./button";
import { Form } from "@remix-run/react";
import { userMenuEnum } from "./enums";
import * as HiIcons from "react-icons/hi";

type Props = {
  username: string;
  avatar: string;
};
const Panel = ({ username, avatar }: Props) => {
  return (
    <div className=" h-[10%] flex items-center justify-between border-b p-2">
      <div className="flex grow">
        <img
          className="mx-2 rounded-full  w-14 h-14"
          src={avatar}
          alt="your avatar"
        />
        <div className="flex flex-col">
          <span className="font-bold ">{username}</span>
          <span>online</span>
        </div>
      </div>

      <div className="flex justify-around mx-auto grow">
        {userMenuEnum.map((item) => (
          <Button {...item} />
        ))}
        <Form action="/logout" method="post">
          <Button type={"submit"} icon={<HiIcons.HiLogout />} />
        </Form>
      </div>
    </div>
  );
};

export default Panel;
