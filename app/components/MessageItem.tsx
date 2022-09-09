import React from "react";
import { localTime } from "~/utils/convertTime";

type Props = {
  id: number;
  sender: number;
  message_text: string;
  sent: string;
  c_id: number;
  username: string;
  avatar: string;
  you: string;
};
const MessageItem = ({
  id,
  sender,
  message_text,
  sent,
  c_id,
  username,
  avatar,
  you
}) => {
  console.log(you);
  const isMe = you === username ? "items-end" : null;
  const bubbleStyle =
    you === username
      ? "bg-gradient-to-r from-blue-500 to bg-green-400 text-white"
      : "bg-slate-200";
  return (
    <div className={`flex flex-col m-5 ${isMe}`}>
      <div className="flex ">
        <img className="w-12 h-12 mr-2" src={avatar} alt="" srcset="" />
        <div className="flex flex-col">
          <span className="font-medium ">{username}</span>
          <span className="text-sm font-light">{localTime(sent)}</span>
        </div>
      </div>
      <p
        className={`p-2 mt-1 ${bubbleStyle} rounded-lg w-max h-auto max-w-[50%] break-words`}
      >
        {message_text}
      </p>
    </div>
  );
};

export default MessageItem;
