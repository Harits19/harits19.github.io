const id = {
  about: "Tentang Saya",
  experience: "Pengalaman Kerja",
  auxiliary_work: "Pengalaman Tambahan", // atau: "Proyek Sampingan"
  education: "Pendidikan",
  additional: "Informasi Tambahan", // atau: "Keahlian & Kompetensi"
  tools: "Perangkat & Teknologi",
  languages: "Bahasa",
} as const;

const en = {
  about: "About Me",
  experience: "Work Experience",
  auxiliary_work: "Additional Experience", // atau: "Side Projects"
  education: "Education",
  additional: "Additional Information", // atau: "Skills & Competencies"
  tools: "Tools & Tech Stack",
  languages: "Languages",
} as const;

const dict = { en, id };

export default dict;
