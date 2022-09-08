import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/models/project_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';

class KObject {
  const KObject._();

  static const List<ExperienceModel> listExperience = [
    ExperienceModel(
      company: "PT. Skyshi Digital Indonesia",
      position: "Mobile Developer",
      time: "February 2021 - March 2022",
      image: KAsset.skyshi,
      jobDesc: [
        "Creating mobile applications using Flutter framework or React Native",
        "Implementing mobile applications based on Business Process Documentation",
        "Fixing bugs base on UAT documentation",
        "Integrating mobile application with API and Firebase",
        "Creating mobile application according to design",
      ],
    ),
    ExperienceModel(
      company: "PT. Imani Prima",
      position: "Fullstack Developer",
      time: "March 2022 - May 2022",
      image: KAsset.imaniPrima,
      jobDesc: [
        "Creating mobile and web applications using Flutter",
        "Implementing applications based on action plan",
        "Fixed bugs found based action plan",
        "Integrating application with API",
        "Creating application according to design",
        "Creating API using Go Language",
        "Integrating MQTT using Go Language",
        "Creating Websocket using Go Language",
        "Management database MongoDB and MySQL",
      ],
    ),
    ExperienceModel(
      company: "PT. Smartfren Telecom Tbk",
      position: "Mobile & UI Engineer",
      time: "Jun 2022 - Present",
      image: KAsset.smarfren,
      jobDesc: [
        "Creating mobile applications using Flutter",
        "Implementing mobile applications based on Jira Ticket",
        "Fixing bugs",
        "Integrating mobile application with API",
        "Creating mobile application according to design",
      ],
    ),
    // ExperienceModel(
    //   company: "Tuntun Les Privat",
    //   position: "Fullstack Developer",
    //   time: "January 2022 - present",
    //   jobDesc: [
    //     "Creating mobile applications using Flutter",
    //     "Implementing mobile applications based on Business Process Documentation",
    //     "Fixed bugs found from UAT documentation",
    //     "Integrating mobile application with API and Firebase",
    //     "Creating mobile application according to design",
    //     "Creating API using Go Language",
    //     "Management database MongoDB",
    //   ],
    // ),
  ];

  static const List<ProjectModel> listProject = [
    ProjectModel(
      image: KAsset.ayoLunas,
      name: "AyoLunas",
      link: "",
      description:
          "Mengerjakan projek ini setelah mempelajari tentang Flutter. Sebagian besar ditugaskan untuk menyelesaikan bug-bug yang ada. Tetapi juga ditugaskan untuk mengerjakan beberapa implementasi design dan integrasi API.",
      highlight: ["Flutter"],
    ),
    ProjectModel(
      image: KAsset.soundfren,
      name: "Soundfren",
      description:
          "Mengerjakan projek ini sekaligus mempelajari React Native. Ditugaskan untuk membantu mengembangkan dan mengimplementasikan program 1000 startup pada aplikasi Soundfren. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
      link:
          "https://play.google.com/store/apps/details?id=com.amoeba.soundfren",
      highlight: ["React Native"],
    ),
    ProjectModel(
      image: KAsset.pejuang,
      name: "Pejuang",
      link: "https://play.google.com/store/apps/details?id=com.bdn.pejuang",
      description:
          "Membuat aplikasi untuk membantu pembayaran berbagai kebutuhan di masyarakat. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
      highlight: ["React Native"],
    ),
    ProjectModel(
      image: KAsset.batumbu,
      name: "Batumbu",
      description:
          "Membuat aplikasi untuk mewadahi pemberi dana dan peminjam dana pada lingkungan UMKM. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
      link: "",
      highlight: ["Flutter"],
    ),
    ProjectModel(
      image: KAsset.protect,
      name: "Protect",
      description:
          "Ini adalah projek pribadi saya. Tujuannya untuk mengisi waktu dan memenuhi kebutuhan mengenai penyimpanan dan pembuat password yang disimpan secara lokal",
      link: "https://play.google.com/store/apps/details?id=com.my_password_app",
      highlight: ["Flutter"],
    ),
    // ProjectModel(
    //   image: KImage.tuntun,
    //   name: "Tuntun Les Privat",
    //   description:
    //       "Ini adalah projek bersama teman saya. Tujuannya untuk mengisi waktu dan membantu kebutuhan les privat yang ada di Yogyakarta",
    //   link: "",
    //   highlight: ["Flutter", "Go", "MongoDB"],
    // ),
    ProjectModel(
      image: KAsset.primasaver,
      name: "Primasaver",
      description:
          "Ini adalah projek mengenai pembuatan aplikasi flutter dan backend golang untuk melakukan manajemen data pemakaian daya listrik dari pengguna",
      link: "https://primasaver.com/home",
      highlight: ["Flutter", "Go", "MongoDB"],
    ),
  ];
}
