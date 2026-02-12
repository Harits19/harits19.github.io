const email = "harits.abdullah19@gmail.com";
const phoneNumber = "6283840493135";
const linkedIn = "linkedin.com/in/abd-harits";
const portfolio = "harits19.github.io";
const github = "github.com/Harits19";
function generateLink(link: string) {
  return `https://${link}`;
}
const profile = {
  name: "ABDULLAH HARITS",
  details: [
    {
      text: "Jakarta, Indonesia",
    },
    {
      text: email,
      link: `mailto:${email}`,
    },
    {
      text: phoneNumber,
      link: `https://wa.me/${phoneNumber}`,
    },
    {
      text: linkedIn,
      link: generateLink(linkedIn),
    },
    {
      text: portfolio,
      link: generateLink(portfolio),
    },
    {
      text: github,
      link: generateLink(github),
    },
  ],
  aboutMe:
    "Full-stack Software Engineer with over three years of experience in developing web and mobile applications using technologies such as Next.js, Express.js, Flutter, and Go. Involved in the development of real-time systems, integration with third-party APIs (including Meta Cloud and WhatsApp), and implementation of microservice-based architectures using Pub/Sub. Familiar with collaborative development environments, code maintainability practices, and supporting improvements in application performance and usability.",
  experience: [
    {
      company: "PT Integra Putra Mandiri",
      location: "Jakarta, Indonesia",
      status: "Permanent",
      position: "Software Engineer – Full-stack Developer",
      date: {
        from: "Mar 2025",
        to: "Present",
      },
    },
  ],
};

export default function useProfile() {
  return profile;
}
