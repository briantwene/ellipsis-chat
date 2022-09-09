import { ActionFunction, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { login, requireGuest } from "../services/auth.server";

//action -  with validation

export const loader = async ({ request, params }) => {
  await requireGuest({ request });

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  //validation for if they exist

  const formErrors = {
    email: email.trim() ? null : "Email is required",
    password: password.trim() ? null : "Password is required"
  };

  const hasErrors = Object.values(formErrors).some((message) => message);
  console.log(hasErrors);
  if (hasErrors) {
    //can return the values here possibly
    return json(formErrors);
  } else {
    //then make a query to the database
    let { errors, redirector } = await login({ request, email, password });
    console.log(errors);
    return errors ? json(errors) : redirector;
  }
};

export default function Login() {
  // for getting the errors
  const formErrors = useActionData();
  return (
    <div className="flex flex-col justify-center w-full h-full ">
      <div className="w-full max-w-md px-8 mx-auto">
        <Form method="post" className="space-y-6">
          {formErrors && <span className="text-red-600 ">{formErrors}</span>}
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                className="w-full px-2 py-2 text-lg border rounded-md  border-slate-500"
                type="text"
                name="email"
                placeholder="twene521@gmail.com"
              />
              {formErrors?.email && (
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
              {formErrors?.password && (
                <span className="text-red-600 ">{errors.password}</span>
              )}
            </div>
          </div>
          <button
            className="w-full p-2 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Login
          </button>
          <div>
            Don't have an account?{" "}
            <Link className="text-blue-500 underline" to="/sign-up">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
