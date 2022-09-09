// find other ways for authentication..

//not sure why re
import axios, { Axios } from "axios";
import { redirect } from "@remix-run/node";

let client = new Axios({
  ...axios.defaults,
  baseURL: process.env.API_HOST,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  }
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error", error);
    // if (!error.response) {
    //   return Promise.reject(error);
    // }

    if (error.response.status === 401) {
      throw redirect("/login");
    }

    if (error.response.status === 404) {
      return error.data;
    }

    // if (error.response.status === 404)
    return Promise.reject(error);
  }
);

export default client;
