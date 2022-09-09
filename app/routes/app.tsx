import React, { useEffect } from "react";
import { Outlet, Link, Form, useLoaderData } from "@remix-run/react";
import { currentToken, requireAuth, user } from "~/services/auth.server";
import client from "~/services/axios.server";
import Sidebar from "~/components/sidebar";
import { useSocket } from "~/context/SocketContext";
import Navigation from "~/components/Navigation";

export const loader = async ({ request, params }) => {
  await requireAuth({ request });

  let userToken = await currentToken({ request });

  let response = await client.get("/conversations/fetch", {
    headers: {
      Authorization: "Bearer " + userToken
    }
  });

  return {
    chats: response.data,
    user: await user({ request })
  };
};

export default function Chat() {
  const chatData = useLoaderData();
  const { socket } = useSocket();

  useEffect(() => {
    socket.connect();
    socket.emit("login", chatData?.user?.userId);
    console.log("user has logged in");

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <div className="flex w-full h-full">
        <Navigation {...chatData.user} />

        <Outlet />
      </div>
    </>
  );
}
