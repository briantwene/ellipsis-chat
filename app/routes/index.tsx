import { Link } from "@remix-run/react";
import Layout from "~/components/layout";
export default function Index() {
  return (
    <Layout direction="flex-col">
      <nav className="flex justify-around border-b-2 border-b-black">
        <div className="flex-1">Ellipsis</div>
        <div className="flex justify-around flex-1">
          <Link to="download">Download</Link>
          <Link to="login">Login</Link>
          <Link to="sign-up">Sign-up</Link>
          <Link to="app">Go to app</Link>
        </div>
      </nav>
      <h1>Welcome to ellipsis-chat</h1>
    </Layout>
  );
}
