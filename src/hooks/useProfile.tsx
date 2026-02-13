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
      link: undefined,
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
  about_me:
    "Full-stack Software Engineer with over three years of experience in developing web and mobile applications using technologies such as Next.js, Express.js, Flutter, and Go. Involved in the development of real-time systems, integration with third-party APIs (including Meta Cloud and WhatsApp), and implementation of microservice-based architectures using Pub/Sub. Familiar with collaborative development environments, code maintainability practices, and supporting improvements in application performance and usability.",
  experience: [
    {
      company: "PT Integra Putra Mandiri",
      location: "Jakarta, Indonesia",
      employment_type: "Permanent",
      position: "Software Engineer – Full-stack Developer",
      start_date: "Mar 2025",
      end_date: "Present",
      responsibilities: [
        "Continued development of the 1ENGAGE product, focusing on scalability and chatbot enhancements.",
        "Integrated Meta Catalog features into the 1ENGAGE product.",
        "Enabled chatbot to handle Catalog Messages and receive conversion events via Meta Cloud API.",
        "Investigated and resolved production issues, improving system stability and reliability.",
        "Developed a Flutter-based mini-game for the Tzu Chi Donate app to enhance user engagement and integrate with the chatbot flow.",
      ],
    },
    {
      company: "PT Admin Pintar Kita",
      location: "Jakarta, Indonesia",
      employment_type: "Probation",
      position: "Frontend Developer",
      start_date: "Feb 2025",
      end_date: "Feb 2025",
      responsibilities: [
        "Initiated use of React SWR to enhance API caching and data fetching reliability.",
        "Developed reusable components using Next.js to ensure design and logic consistency across pages.",
      ],
    },
    {
      company: "PT Eka Nusantara Gemilang",
      location: "Jakarta, Indonesia",
      employment_type: "Permanent",
      position: "Software Development Specialist – Full-stack Developer",
      start_date: "Aug 2023",
      end_date: "Dec 2024",
      responsibilities: [
        "Built web apps using Next.js and backend services with Express.js.",
        "Designed and implemented event-driven services with Google Pub/Sub.",
        "Integrated WhatsApp chatbot systems using the Meta Cloud API.",
        "Developed a broadcast engine leveraging Pub/Sub and a microservices architecture.",
        "Led code reviews focusing on DRY principles and performance optimization.",
      ],
    },
    {
      company: "PT Smartfren Telecom",
      location: "Jakarta, Indonesia",
      employment_type: "Permanent",
      position: "Software Engineer – Mobile, Frontend & Backend Developer",
      start_date: "Jun 2022",
      end_date: "Aug 2023",
      responsibilities: [
        "Developed mobile sales applications using Flutter.",
        "Developed 1ENGAGE mobile app using React Native.",
        "Migrated the 1ENGAGE product's frontend from Quasar to Next.js and the backend from Go to Express.js to improve maintainability.",
        "Designed a reusable chatbot engine with flexible use case support.",
      ],
    },
    {
      company: "PT Imani Prima",
      location: "Bandung, Indonesia",
      employment_type: "Contract",
      position: "Mobile, Frontend & Backend Developer",
      start_date: "Mar 2022",
      end_date: "May 2022",
      responsibilities: [
        "Developed mobile and web apps using Flutter.",
        "Managed databases in MongoDB and MySQL.",
        "Integrated MQTT and WebSocket protocols using Go.",
      ],
    },
    {
      company: "PT Skyshi Digital Indonesia",
      location: "Yogyakarta, Indonesia",
      employment_type: "Contract",
      position: "Mobile, Frontend & Backend Developer",
      start_date: "Feb 2021",
      end_date: "Mar 2022",
      responsibilities: [
        "Delivered mobile apps using Flutter and React Native.",
        "Collaborated on features based on Business Process Documents and UAT feedback.",
        "Integrated applications with REST APIs and Firebase.",
      ],
    },
  ],
  auxiliary_work: [
    {
      project: "Wisata Niaga Hotel – ChicodeFive",
      type: "Side Project",
      position: "Flutter Developer",
      start_date: "May 2023",
      end_date: "Aug 2023",
      responsibilities: [
        "Developed a hotel management application using Flutter.",
        "Created reusable components to maintain consistency across application pages.",
      ],
    },
  ],
  education: [
    {
      institution: "Universitas Brawijaya",
      location: "Malang, Indonesia",
      degree: "Bachelor of Computer Science",
      gpa: "3.66/4.00",
      start_date: "Aug 2017",
      end_date: "Jan 2021",
    },
  ],
  skills: {
    frontend: ["React.js", "Next.js", "Tailwind", "Ant Design", "Radix UI"],
    backend: ["Go", "Express.js"],
    mobile: ["Flutter", "React Native", "Jetpack Compose"],
    database: ["MongoDB", "MySQL"],
    architecture: ["Microservices", "Event-Driven Architecture", "REST APIs"],
    message_broker: ["Google Pub/Sub"],
    state_management: [
      "Redux Toolkit",
      "TanStack",
      "Riverpod",
      "Bloc",
      "Provider",
      "React SWR",
    ],
    testing: ["Sinon", "Chai"],
    dev_tools: [
      "GitHub",
      "GitLab",
      "Figma",
      "JIRA",
      "Trello",
      "Slack",
      "Microsoft Teams",
    ],
    cloud_and_protocols: ["Google Cloud Platform", "MQTT", "WebSocket"],
  },
  languages: {
    "Bahasa Indonesia": "Native",
    English: "Intermediate (working proficiency)",
  },
} as const;

export default function useProfile() {
  return profile;
}
