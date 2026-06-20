"use client";
import { useMemo } from "react";

import useDict from "@/hooks/use_dict";
import useProfile from "@/hooks/use_profile";
import SectionView from "@/app/components/section_view";
import ProjectView from "@/app/components/project_view";
import DetailView from "@/app/components/detail_view";
import ListView from "@/app/components/list_view";
import ListItemView from "@/app/components/list_item_view";
import Text from "@/app/components/text";
import {
  DetailItem,
  ExperienceItem,
  SkillCategory,
} from "@/hooks/use_profile/type";
import { defaultLineChar } from "@/constants/animation";
import PortfolioView from "./portfolio_view";

/** Helper functions moved outside to prevent re-declaration on every render */
const getExperiencesLength = (items: ExperienceItem[]) =>
  items.reduce<number>(
    (prev, current) =>
      prev +
      `${current.company} ${current.location} ${current.employment_type} ${current.position} ${current.start_date} ${current.end_date ?? ""} ${current.responsibilities.join(",")}`
        .length,
    0,
  );

const getProfileDetailLength = (details: DetailItem[]) =>
  details.reduce((prev, current) => prev + current.text.length, 0);

const getSkillLength = (skills: SkillCategory[]) =>
  skills.reduce(
    (prev, curr) => prev + `${curr.title} : ${curr.tools.join(", ")}`.length,
    0,
  );

export default function CvView() {
  const { name, details, education, ...profile } = useProfile();
  const dict = useDict();

  const normalizedEducation = `${education.institution} - ${education.location}`;

  // Memoize all character calculations to optimize performance
  const { char, offsets } = useMemo(() => {
    const charCounts = {
      name: name.length,
      details: getProfileDetailLength(details),
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

    const o = {
      name: 0,
      details: name.length,
      aboutSection: name.length + charCounts.details,
      aboutMe: 0,
      experienceSection: 0,
      experienceList: 0,
      additionalExpSection: 0,
      educationSection: 0,
      educationDetail: 0,
      educationGpa: 0,
      skillsSection: 0,
      languagesSection: 0,
    };

    o.aboutMe = o.aboutSection + charCounts.about + charCounts.line;
    o.experienceSection = o.aboutMe + charCounts.about_me;
    o.experienceList =
      o.experienceSection + charCounts.experience + charCounts.line;
    o.additionalExpSection = o.experienceList + charCounts.experiences;
    o.educationSection =
      o.additionalExpSection +
      charCounts.additional_experience +
      charCounts.line +
      charCounts.additional_experiences;
    o.educationDetail =
      o.educationSection + charCounts.education + charCounts.line;
    o.educationGpa =
      o.educationDetail +
      normalizedEducation.length +
      education.start_date.length +
      education.end_date.length +
      education.degree.length;
    o.skillsSection = o.educationGpa + charCounts.gpa;
    o.languagesSection = o.skillsSection + charCounts.skills;

    return { char: charCounts, offsets: o };
  }, [name, details, education, profile, dict, normalizedEducation]);

  return (
    <div
      id="print-area"
      className="flex a4 flex-col p-10 text-11pt w-full bg-white text-slate-950 shadow-2xl print:shadow-none"
    >
      <span className="font-semibold text-left text-16pt">
        <Text text={name} />
      </span>
      <div className="flex flex-wrap text-left whitespace-pre-wrap">
        {details.map(({ text, link }, index) => {
          const detailsBefore = details.slice(0, index);
          const totalChar =
            getProfileDetailLength(detailsBefore) + offsets.details;
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

      <SectionView
        id="about"
        title={dict.about}
        charBefore={offsets.aboutSection}
      >
        <Text text={profile.about_me} charBefore={offsets.aboutMe} />
      </SectionView>
      <SectionView
        id="experience"
        title={dict.experience}
        charBefore={offsets.experienceSection}
      >
        <div className="flex flex-col w-full gap-3">
          {profile.experience.map((item, index) => {
            const charBefore =
              getExperiencesLength(profile.experience.slice(0, index)) +
              offsets.experienceList;
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
      <SectionView
        title={dict.additional_experience}
        charBefore={offsets.additionalExpSection}
      >
        {profile.additional_experiences.map((item) => (
          <ProjectView
            key={item.company}
            item={item}
            charBefore={
              offsets.additionalExpSection +
              char.additional_experience +
              char.line
            }
          />
        ))}
      </SectionView>
      <SectionView title={dict.education} charBefore={offsets.educationSection}>
        <DetailView
          title={normalizedEducation}
          endDate={education.end_date}
          startDate={education.start_date}
          position={education.degree}
          charBefore={offsets.educationDetail}
        />
        <Text text={education.gpa} charBefore={offsets.educationGpa} />
      </SectionView>
      <SectionView
        id="skills"
        title={dict.additional}
        charBefore={offsets.skillsSection}
      >
        <ListView
          items={profile.skills.map((item, index) => {
            const charBefore =
              getSkillLength(profile.skills.slice(0, index)) +
              offsets.skillsSection;
            return {
              view: (
                <div key={item.title} className="flex flex-row">
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
      <SectionView title={dict.languages} charBefore={offsets.languagesSection}>
        <ListItemView
          charBefore={offsets.languagesSection}
          items={profile.languages.map((item) => {
            return {
              title: item.name,
              value: [item.level],
            };
          })}
        />
      </SectionView>
    </div>
  );
}
