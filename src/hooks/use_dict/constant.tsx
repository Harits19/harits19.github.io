const en = {
  about: "About Me",
  experience: "Work Experience",
  additional_experience: "Additional Experience", // atau: "Side Projects"
  education: "Education",
  additional: "Additional Information", // atau: "Skills & Competencies"
  tools: "Tools & Tech Stack",
  languages: "Languages",
  print: "Print",
  portfolio: "Portfolio",
  projects: "Projects",
  projectOverview: "Project Overview",
  liveDemo: "Live Demo",
  internalProject: "Internal Project",
  github: "GitHub",
  cv: "Resume",
  cvTitle: "Curriculum Vitae",
  downloadCv: "Download / Print CV",
  contact: "Contact me",
} as const;
const id = {
  ...en,
  about: "Tentang Saya",
  experience: "Pengalaman Kerja",
  additional_experience: "Pengalaman Tambahan", // atau: "Proyek Sampingan"
  education: "Pendidikan",
  additional: "Informasi Tambahan", // atau: "Keahlian & Kompetensi"
  tools: "Perangkat & Teknologi",
  languages: "Bahasa",
  print: "Cetak",
  portfolio: "Portofolio",
  projects: "Proyek",
  projectOverview: "Ringkasan Proyek",
  liveDemo: "Demo Langsung",
  internalProject: "Proyek Internal",
  github: "GitHub",
  cv: "CV",
  cvTitle: "Daftar Riwayat Hidup",
  downloadCv: "Unduh / Cetak CV",
  contact: "Hubungi Saya",
} as const;

const dict = { en, id };

export default dict;
