const en = {
  aboutMe: "About Me",
} as const;

const id = {
  ...en,
} as const;

export default function useDict() {
  return en;
}
