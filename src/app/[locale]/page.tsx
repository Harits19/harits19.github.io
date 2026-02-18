"use client";

import useDict from "@/hooks/use_dict";
import useProfile from "@/hooks/use_profile";
import SectionView from "@/app/components/section_view";
import ProjectView from "../components/project_view";
import React from "react";
import DetailView from "../components/detail_view";
import ListView from "../components/list_view";
import ListItemView from "../components/list_item_view";
import Text from "../components/text";
import { DetailItem, ExperienceItem } from "@/hooks/use_profile/type";
import { defaultLineChar } from "@/constants/animation";

export default function Home() {
  const { name, details, ...profile } = useProfile();

  const dict = useDict();
  function getExperiencesLength(items: ExperienceItem[]) {
    return items.reduce<number>(
      (prev, current) =>
        `${current.company} ${current.location} ${current.employment_type} ${current.position} ${current.start_date} ${current.end_date ?? ""} ${current.responsibilities.map((item) => item)}`
          .length + prev,
      0,
    );
  }

  function getProfileDetail(details: DetailItem[]) {
    return details.reduce((prev, current) => current.text.length + prev, 0);
  }

  const char = {
    name: name.length,
    details: getProfileDetail(details),
    about: dict.about.length,
    about_me: profile.about_me.length,
    experience: dict.experience.length,
    line: defaultLineChar + 10,
    experiences: getExperiencesLength(profile.experience),
  };
  const section1 = name.length;
  const section2 = section1 + char.details;
  const section3 = section2 + char.about + char.line;
  const section4 = section3 + char.about_me;
  const section5 = section4 + char.experience + char.line;
  const section6 = section5 + char.experiences;
  return (
    <div className="h-screen w-[210mm] overflow-y-scroll">
      <div
        id="print-area"
        className="flex a4 flex-col p-10  text-11pt w-full   bg-white"
      >
        <span className="font-semibold text-left text-16pt">
          <Text text={name} />
        </span>
        <div className="flex flex-wrap text-left whitespace-pre-wrap">
          {details.map(({ text, link }, index) => {
            const detailsBefore = details.slice(0, index);
            const totalChar = getProfileDetail(detailsBefore) + section1;
            return (
              <div
                key={text}
                className="flex flex-row items-center whitespace-pre"
              >
                <a target="_blank" href={link}>
                  <Text text={`${text} | `} charBefore={totalChar} />
                </a>
              </div>
            );
          })}
        </div>
        <br />

        <SectionView title={dict.about} charBefore={section2}>
          <Text text={profile.about_me} charBefore={section3} />
        </SectionView>
        <SectionView title={dict.experience} charBefore={section4}>
          <div className="flex flex-col w-full gap-3">
            {profile.experience.map((item, index) => {
              const charBefore =
                getExperiencesLength(profile.experience.slice(0, index)) +
                section5;
              return (
                <ProjectView
                  key={item.company}
                  item={item}
                  charBefore={charBefore}
                />
              );
            })}
          </div>
        </SectionView>
        <SectionView title={dict.auxiliary_work}>
          {profile.auxiliary_work.map((item) => (
            <ProjectView key={item.company} item={item} charBefore={section6} />
          ))}
        </SectionView>
        <SectionView title={dict.education}>
          {profile.education.map((item) => (
            <React.Fragment key={item.institution}>
              <DetailView
                title={[item.institution, item.location].join(" - ")}
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
