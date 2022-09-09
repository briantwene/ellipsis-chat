import React, { ReactNode } from "react";
import * as HiIcons from "react-icons/hi";

type enumObject = {
  title: string;
  path: string;
  icon: ReactNode;
};

export const userMenuEnum: enumObject[] = [
  {
    title: "Messages",
    path: "messages",
    icon: <HiIcons.HiOutlineChat />
  },
  {
    title: "Calls",
    path: "calls",
    icon: <HiIcons.HiOutlinePhone />
  },
  {
    title: "Settings",
    path: "settings",
    icon: <HiIcons.HiOutlineCog />
  }
];

export const settingMenuEnum: enumObject[] = [
  {
    title: "Profile",
    path: "/app/settings",
    icon: <HiIcons.HiOutlineUserCircle />
  },
  {
    title: "Account",
    path: "account",
    icon: <HiIcons.HiOutlineIdentification />
  },
  {
    title: "Appearance",
    path: "appearance",
    icon: <HiIcons.HiOutlineColorSwatch />
  },
  {
    title: "Voice and Video",
    path: "voice-video",
    icon: <HiIcons.HiOutlineVideoCamera />
  },
  {
    title: "Messaging",
    path: "messaging",
    icon: <HiIcons.HiOutlineChat />
  },
  {
    title: "Notfications",
    path: "notifications",
    icon: <HiIcons.HiOutlineMail />
  },
  {
    title: "Language and Region",
    path: "lang-region",
    icon: <HiIcons.HiOutlineGlobe />
  }
];
