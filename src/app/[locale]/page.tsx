"use client";

import useDict from "@/hooks/use_dict";
import useProfile from "@/hooks/use_profile";
import SectionView from "@/app/components/section_view";
import ProjectView from "../components/project_view";
import React from "react";
import DetailView from "../components/detail_view";
import ListView from "../components/list_view";
import ListItemView from "../components/list_item_view";

export default function Home() {
  const { name, details, ...profile } = useProfile();
  const dict = useDict();
  return (
    <div className="h-screen w-[210mm] overflow-y-scroll">
      <div
        id="print-area"
        className="flex a4 flex-col p-10  text-11pt w-full   bg-white"
      >
        <span className="font-semibold text-left text-16pt">{name}</span>
        <div className="flex flex-wrap text-left ">
          {details.map(({ text, link }) => {
            return (
              <div
                key={text}
                className="flex flex-row items-center whitespace-pre"
              >
                <a target="_blank" href={link}>
                  {text}
                </a>
                {" | "}
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
        <SectionView title={dict.education}>
          {profile.education.map((item) => (
            <React.Fragment key={item.institution}>
              <DetailView
                title={[item.institution, item.location]}
                endDate={item.end_date}
                startDate={item.start_date}
                position={item.degree}
              />
              <span>Cumulative GPA: {item.gpa}</span>
            </React.Fragment>
          ))}
        </SectionView>
        <SectionView title={dict.additional}>
          <ListView
            items={profile.skills.map((item) => (
              <div key={item.title} className="flex flex-row ">
                <span className="w-1/3">{item.title}</span>
                <span className="w-full"> : {item.tools.join(", ")}</span>
              </div>
            ))}
          />
          <ListItemView
            items={profile.skills.map((item) => ({
              title: item.title,
              value: item.tools,
            }))}
          />
        </SectionView>
        <SectionView title={dict.languages}>
          <ListItemView
            items={profile.languages.map((item) => ({
              title: item.name,
              value: [item.level],
            }))}
          />
        </SectionView>
      </div>
    </div>
  );
}
