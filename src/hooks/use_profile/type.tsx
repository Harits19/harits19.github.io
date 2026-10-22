export interface CV {
  name: string;
  linkedIn: string;
  github: string;
  mailto: string;
  whatsapp: string;
  details: DetailItem[];
  about_me: string;
  experience: ExperienceItem[];
  additional_experiences: ExperienceItem[];
  education: EducationItem;
  skills: SkillCategory[];
  projects: ProjectItem[];
  languages: LanguageItem[];
}

export interface DetailItem {
  text: string;
  link?: string;
}

export interface ExperienceItem {
  company: string;
  location?: string;
  employment_type: string;
  position: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  gpa: string;
  start_date: string;
  end_date: string;
}

export interface SkillCategory {
  title: string;
  tools: string[];
}

/** Proyek ringkas untuk section Projects di CV. `link` = repo/demo publik. */
export interface ProjectItem {
  name: string;
  stack: string[];
  description: string;
  link?: string;
  /** Label kecil di akhir baris, mis. penanda "internal — walkthrough". */
  note?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}
