import { ActionFunction, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import React from "react";
import Layout from "~/components/layout";

//action -  with validation

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  //validation for if they exist

  const errors = {
    email: email.trim() ? null : "Email is required",
    password: password.trim() ? null : "Password is required"
  };

  console.log(errors);
  const hasErrors = Object.values(errors).some((message) => message);

  if (hasErrors) {
    //can return the values here possibly
    return json(errors);
  }

  //then make a query to the database

  //can come up with more validations....

  //then check if the user is the user
};

export default function SignUp() {
  // for getting the errors
  const errors = useActionData();
  return (
    <div className="flex flex-col justify-center w-full h-full ">
      <div className="w-full max-w-md px-8 mx-auto">
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                className="w-full px-2 py-2 text-lg border rounded-md  border-slate-500"
                type="text"
                name="email"
                placeholder="twene521@gmail.com"
              />
              {errors?.email && (
                <span className="text-red-600 ">{errors.email}</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                className="w-full px-2 py-2 text-lg border border-gray-200 rounded-md "
                type="password"
                name="password"
              />
              {errors?.password && (
                <span className="text-red-600 ">{errors.password}</span>
              )}
            </div>
          </div>
          <button
            className="w-full p-2 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Register
          </button>
        </Form>
      </div>
    </div>
  );
}
