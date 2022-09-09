import React, { useState } from "react";
import { Link, Form } from "@remix-run/react";
import Panel from "./panel";
import Button from "./button";
import ChatItem from "./chatItem";

type Props = {
  user: object;
  chats: object[];
};

const Sidebar = ({ user, chats }: Props) => {
  const [query, setQuery] = useState("");

  const filteredChats = chats.filter((chat) => {
    return (
      chat?.c_name?.toLowerCase().includes(query.toLowerCase()) ||
      chat?.userinfo?.username.toLowerCase().includes(query.toLowerCase())
    );
  });

  console.log(filteredChats);

  const handleQuery = ({ target }) => {
    setQuery(target.value);
  };

  const handleSearch = () => {};
  return (
    <div className="w-1/4 max-h-screen border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between h-[15%] p-5">
          <h1 className="text-3xl font-semibold text-blue-500">Messages</h1>
          <div>
            <input
              className="w-full p-2 text-lg bg-slate-100 rounded-xl"
              type="text"
              onChange={handleQuery}
              placeholder="Search"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[85%]">
          {filteredChats.length ? (
            filteredChats.map((chat, index) => (
              <Link to={`/app/messages/${chat.c_id}`} key={index}>
                <ChatItem {...chat} />
              </Link>
            ))
          ) : (
            <div>no results</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
