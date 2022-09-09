import type { MetaFunction } from "@remix-run/node";
import styles from "./styles/app.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { SocketProvider } from "./context/SocketContext";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});

export default function App() {
  return (
    <html lang="en" className="h-screen overflow-hidden">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen">
        <SocketProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </SocketProvider>
      </body>
    </html>
  );
}
