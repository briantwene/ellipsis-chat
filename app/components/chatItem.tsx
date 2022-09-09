import React from "react";

type Props = {
  c_id: number;
  c_name?: string;
  user_id: number;
  userinfo: object;
  c_avatar?: string;
  key: number;
};
const ChatItem = ({ c_id, c_name, user_id, c_avatar, userinfo }: Props) => {
  return (
    <div className="flex p-4 m-2 rounded-xl">
      <img
        className="mr-2 w-14 h-14"
        src={c_avatar || userinfo?.avatar}
        alt=""
        srcset=""
      />
      <div className="flex flex-col ">
        <span>{c_name || userinfo?.username}</span>
        <span>how was it?</span>
      </div>
    </div>
  );
};

export default ChatItem;
