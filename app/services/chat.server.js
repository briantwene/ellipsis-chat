import { client } from "./axios.server";
export const sendMessage = async (newMessage) => {
  const response = await client.post("/messages/addMessage", newMessage);

  console.log("somm data", response.data);
};
