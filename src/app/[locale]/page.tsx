"use client";

import useDict from "@/hooks/use_dict";
import useProfile from "@/hooks/use_profile";
import SectionView from "@/app/components/section_view";
import ProjectView from "../components/project_view";

export default function Home() {
  const { name, details, ...profile } = useProfile();
  const dict = useDict();
  return (
    <div
      id="print-area"
      className="flex a4 flex-col items-center p-10 h-full text-11pt  w-[210mm]  bg-white"
    >
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

      <SectionView title={dict.about}>{profile.about_me}</SectionView>
      <SectionView title={dict.experience}>
        <div className="flex flex-col w-full gap-3">
          {profile.experience.map((item) => (
            <ProjectView key={item.company} item={item} />
          ))}
        </div>
      </SectionView>
      <SectionView title={dict.auxiliary_work}>
        {profile.auxiliary_work.map((item) => (
          <ProjectView key={item.company} item={item} />
        ))}
      </SectionView>
    </div>
  );
}
