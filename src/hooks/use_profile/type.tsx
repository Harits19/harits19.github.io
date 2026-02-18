export interface CV {
  name: string;
  details: DetailItem[];
  about_me: string;
  experience: ExperienceItem[];
  auxiliary_work: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
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

export interface LanguageItem {
  name: string;
  level: string;
}
