import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import ChatContainer from "~/components/chatContainer";
import ChatInput from "~/components/chatInput";
import ChatPanel from "~/components/chatpanel";
import MessageItem from "~/components/MessageItem";
import Panel from "~/components/panel";
import { scrollIntoView } from "seamless-scroll-polyfill";

import {
  currentToken,
  requireAuth,
  sendMessage,
  user
} from "~/services/auth.server";
import client from "~/services/axios.server";
import * as HiIcons from "react-icons/hi";
import { useSocket } from "~/context/SocketContext";

export const loader = async ({ request, params }) => {
  //check if the user can be on this page

  await requireAuth({ request });

  //then get the data that is needed

  const userToken = await currentToken({ request });

  const roomResponse = await client
    .get("/conversations/fetchOne", {
      params: {
        conversationId: params.c_id
      },
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
    .catch((e) => console.log("sum error 2", e));

  const messageResponse = await client
    .get("/messages/fetch", {
      params: {
        conversationId: params.c_id
      },
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
    .catch((e) => console.log("sum error", e));

  const membersResponse =
    roomResponse?.data.type === "G" &&
    (await client
      .get("/users/members", {
        params: {
          conversationId: params.c_id
        },
        headers: {
          Authorization: "Bearer " + userToken
        }
      })
      .catch((e) => console.log("sum error 2", e)));

  return {
    messages: messageResponse?.data || [],
    chatRoom: roomResponse?.data || null,
    members: membersResponse?.data || null,
    user: (await user({ request })) || null
  };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const sent = formData.get("sent");
  const message_text = formData.get("message_text");
  const c_id = formData.get("c_id");
  const sender = formData.get("sender");

  await sendMessage({ sent, message_text, c_id, sender }).catch((e) =>
    console.log("sending error:", e)
  );
  return null;
};

const CurrentChat = () => {
  const { messages, chatRoom, members, user } = useLoaderData();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const container = useRef(null);
  const { socket } = useSocket();
  const submit = useSubmit();

  const scrollToBottom = () => {
    scrollIntoView(container.current, { behavior: "smooth", block: "nearest" });
  };

  console.log("messages", messages);
  console.log("chatRoom", chatRoom);
  console.log("user", user);
  console.log("members", members);
  //updateMessages - to update the current users messages

  // function for dealing with sending over websocket

  const updateMessages = (newMessage) => {
    setMessageList((currentList) => [...currentList, newMessage]);
  };

  useEffect(() => {
    setMessageList(messages);
  }, [chatRoom.c_id]);

  const socketSend = (messageObject) => {
    if (chatRoom?.type === "G") {
      socket.emit("send-group", {
        messageObject,
        members: members.filter((member) => member.user_id !== user.userId)
      });
    } else {
      socket.emit("send", {
        ...messageObject,
        to: chatRoom?.userinfo?.user_id
      });
    }
  };

  useEffect(scrollToBottom, [messageList]);

  //onSend - for sending to the backend and through socket
  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const onSend = () => {
    const parsedMessage = message;

    const messageObject = {
      sent: new Date().toISOString(),
      message_text: parsedMessage,
      c_id: chatRoom?.c_id,
      sender: user?.userId,
      avatar: user?.avatar,
      username: user?.username
    };

    console.log("messageObject", messageObject);

    updateMessages(messageObject);
    socketSend(messageObject);
    submit(messageObject, { method: "post" });

    console.log(message);
  };

  useEffect(() => {
    console.log("socket is listening to messages");
    socket.on("newMessage", (message) => {
      console.log("NEW MESSAGE");
      updateMessages(message);
    });
    return () => {
      console.log("socket was disconnected");
      socket.off("newMessage", console.log("listener for new messages is off"));
    };
  }, []);

  return (
    <div className="flex flex-col flex-grow ">
      <ChatPanel {...chatRoom} />

      {/* chat container */}
      <div className="flex flex-col flex-grow overflow-y-auto h-4/5">
        {messageList.length !== 0 ? (
          messageList.map((message, index) => (
            <MessageItem key={index} you={user?.username} {...message} />
          ))
        ) : (
          <div className="self-center my-auto">Send a message to begin</div>
        )}
        <div ref={container} />
      </div>

      {/* userInptu */}
      <div className="h-[10%]  flex border-t items-center px-10 ">
        <input
          className="w-full px-2 py-2 text-lg border rounded-md bg-slate-100 "
          type="text"
          name="email"
          onChange={onChange}
          placeholder={`message ${
            chatRoom?.c_name || chatRoom.userinfo.username
          }`}
        />
        <button
          className="p-3 m-3 text-2xl text-white bg-blue-700 rounded-full"
          onClick={onSend}
          disabled={!message.trim()}
        >
          <HiIcons.HiPaperAirplane />
        </button>
      </div>
    </div>
  );
};

export default CurrentChat;
