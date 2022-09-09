import { createCookieSessionStorage, redirect } from "@remix-run/node";
import client from "./axios.server";

let storage = createCookieSessionStorage({
  cookie: {
    name: "session-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});

//function for logging in
export const login = async ({ request, email, password }) => {
  let response;
  let session = await storage.getSession(request.headers.get("Cookie"));

  try {
    response = await client.post("/users/login", { email, password });
  } catch (error) {
    return { errors: error.response.data.errors };
  }

  session.set("userToken", response.data.token);

  return {
    redirector: redirect("/app", {
      headers: {
        "Set-Cookie": await storage.commitSession(session)
      }
    })
  };
};

//function for logging out
export const logout = async ({ request }) => {
  // get the session from the storage
  const session = await storage.getSession(request.headers.get("Cookie"));
  console.log("session", session);

  let token = session.get("userToken");

  //append to the auth-token
  await client.post(
    "/users/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );

  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
};

//function for getting the current user back
export const currentToken = async ({ request }) => {
  const session = await storage.getSession(request.headers.get("Cookie"));

  return session.get("userToken");
};

//function for authenticating the user
export const user = async ({ request }) => {
  //get the token
  let response;
  let token = await currentToken({ request });

  //add it to the auth header for a request to the server
  //will need to confirm for this to work
  try {
    response = await client.get("/users/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
  } catch (error) {
    return null;
  }

  //return the data...
  return response.data;
};

//for redirecting logged in user to the app
export const requireGuest = async ({ request }) => {
  if (await user({ request })) {
    throw redirect("/app");
  }
};

//protect the routes..
export const requireAuth = async ({ request }) => {
  const token = await currentToken({ request });

  if (!token) {
    throw redirect("/login");
  }
};

export const sendMessage = async (newMessage) => {
  const response = await client
    .post("/messages/addMessage", newMessage)
    .catch((e) => console.log("axios-server-error:", e));

  console.log(response);
};
