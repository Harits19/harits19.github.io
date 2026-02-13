"use client";

import useDict from "@/hooks/useDict";
import useProfile from "../../hooks/useProfile";

export default function Home() {
  const { name, details, ...profile } = useProfile();
  const dict = useDict();
  return (
    <div className="flex flex-col items-center p-20 w-full h-full text-11pt ">
      <span className="font-semibold text-16pt">{name}</span>
      <div className="flex flex-wrap text-center justify-center">
        {details.map(({ text, link }) => {
          return (
            <div
              key={text}
              className="flex flex-row items-center whitespace-pre"
            >
              <a target="_blank" href={link}>
                {text}
              </a>
              <span> | </span>
            </div>
          );
        })}
      </div>
      <br />
      <div className=" w-full flex flex-col text-justify">
        <span className="font-semibold text-12pt uppercase">
          {dict.aboutMe}
        </span>
        <div className="w-full border-b-[0.5px]"></div>
        <span>{profile.about_me}</span>
      </div>
    </div>
  );
}
