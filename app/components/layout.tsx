import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  direction: string;
};

export default function Layout({ children, direction }: Props) {
  return (
    <div className={` h-screen w-full flex ${direction} bg-sky-400`}>
      {children}
    </div>
  );
}
