"use client";

import useDict from "@/hooks/use_dict";
import useProfile from "@/hooks/use_profile";
import SectionView from "@/app/components/section_view";
import ProjectView from "../components/project_view";
import DetailView from "../components/detail_view";
import ListView from "../components/list_view";
import ListItemView from "../components/list_item_view";
import Text from "../components/text";
import {
  DetailItem,
  ExperienceItem,
  SkillCategory,
} from "@/hooks/use_profile/type";
import { defaultLineChar } from "@/constants/animation";

export default function Home() {
  const { name, details, education, ...profile } = useProfile();

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
    additional_experience: dict.additional_experience.length,
    additional_experiences: getExperiencesLength(
      profile.additional_experiences,
    ),
    education: dict.education.length,
    gpa: education.gpa.length,
    skills: getSkillLength(profile.skills),
  };
  const normalizedEducation = [education.institution, education.location].join(
    " - ",
  );

  function getSkillLength(skills: SkillCategory[]) {
    return skills.reduce(
      (prev, curr) => prev + `${curr.title} : ${curr.tools.join(", ")}`.length,
      0,
    );
  }

  const section1 = name.length;
  const section2 = section1 + char.details;
  const section3 = section2 + char.about + char.line;
  const section4 = section3 + char.about_me;
  const section5 = section4 + char.experience + char.line;
  const section6 = section5 + char.experiences;
  const section7 = section6 + char.additional_experience + char.line;
  const section8 = section7 + char.additional_experiences;
  const section9 = section8 + char.education + char.line;
  const section10 =
    section9 +
    normalizedEducation.length +
    education.start_date.length +
    education.end_date.length +
    education.degree.length;
  const section11 = section10 + char.gpa;
  const section12 = section11 + char.skills;
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
        <SectionView title={dict.additional_experience} charBefore={section6}>
          {profile.additional_experiences.map((item) => (
            <ProjectView key={item.company} item={item} charBefore={section7} />
          ))}
        </SectionView>
        <SectionView title={dict.education} charBefore={section8}>
          <DetailView
            title={normalizedEducation}
            endDate={education.end_date}
            startDate={education.start_date}
            position={education.degree}
            charBefore={section9}
          />
          <Text text={education.gpa} charBefore={section10} />
        </SectionView>
        <SectionView title={dict.additional} charBefore={section11}>
          <ListView
            items={profile.skills.map((item, index) => {
              const charBefore =
                getSkillLength(profile.skills.slice(0, index)) + section11;
              return {
                view: (
                  <div key={item.title} className="flex flex-row ">
                    <span className="w-1/3">
                      <Text text={item.title} charBefore={charBefore} />
                    </span>
                    <span className="w-full">
                      <Text
                        text={` : ${item.tools.join(", ")}`}
                        charBefore={charBefore + item.title.length}
                      />
                    </span>
                  </div>
                ),
                charBefore,
              };
            })}
          />
        </SectionView>
        <SectionView title={dict.languages} charBefore={section12}>
          <ListItemView
            charBefore={section12}
            items={profile.languages.map((item) => {
              return {
                title: item.name,
                value: [item.level],
              };
            })}
          />
        </SectionView>
      </div>
    </div>
  );
}