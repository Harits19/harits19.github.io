"use client";

import useDict from "@/hooks/use_dict";
import useProfile from "@/hooks/use_profile";
import SectionView from "@/components/section_view";

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
            <div key={item.company} className="flex flex-col w-full">
              <span className="font-semibold">
                {item.company} - {item.location} - {item.employment_type}
              </span>
              <span className="italic">{item.position}</span>
              <span className="italic text-black/70">
                {item.start_date} - {item.end_date}
              </span>
              <ul className="list-disc ml-4">
                {item.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionView>
    </div>
  );
}
