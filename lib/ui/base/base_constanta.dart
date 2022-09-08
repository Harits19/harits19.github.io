import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/models/project_model.dart';

class KImage {
  const KImage();
  static const _path = 'assets';
  static const String profile = "$_path/profile.jpg";
  static const String protect = "$_path/protect.webp";
  static const String ayoLunas = "$_path/ayolunas.png";
  static const String soundfren = "$_path/soundfren.webp";
  static const String pejuang = "$_path/pejuang.webp";
  static const String batumbu = "$_path/batumbu.png";
  static const String tuntun = "$_path/tuntun.png";
  static const String primasaver = "$_path/primasaver.png";
  static const String imaniPrima = '$_path/imaniPrima.png';
  static const String skyshi = '$_path/skyshi.png';
  static const String smarfren = '$_path/smarfren.png';
}

class KText {
  const KText();

  static const String email = "harits.abdullah19@gmail.com";
 static const List<String> listOfSkill1 = [
    "Flutter",
    "React Native",
    "Object Oriented Programming",
    "MongoDB",
    "MySQL",
  ];

  static const List<String> listOfSkill2 = [
    "CI/CD",
    "GIT",
    "Functional Programming",
    "Go",
  ];

  static const List<String> listHeader = ["About", "Experience", "Work", "Contact"];
}

class KObject {
  const KObject();

 static const  List<ExperienceModel> listExperience = [
    ExperienceModel(
      company: "PT. Skyshi Digital Indonesia",
      position: "Mobile Developer",
      time: "February 2021 - March 2022",
      image: KImage.skyshi,
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
      image: KImage.imaniPrima,
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
      image: KImage.smarfren,
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
      image: KImage.ayoLunas,
      name: "AyoLunas",
      link: "",
      description:
          "Mengerjakan projek ini setelah mempelajari tentang Flutter. Sebagian besar ditugaskan untuk menyelesaikan bug-bug yang ada. Tetapi juga ditugaskan untuk mengerjakan beberapa implementasi design dan integrasi API.",
      highlight: ["Flutter"],
    ),
    ProjectModel(
      image: KImage.soundfren,
      name: "Soundfren",
      description:
          "Mengerjakan projek ini sekaligus mempelajari React Native. Ditugaskan untuk membantu mengembangkan dan mengimplementasikan program 1000 startup pada aplikasi Soundfren. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
      link:
          "https://play.google.com/store/apps/details?id=com.amoeba.soundfren",
      highlight: ["React Native"],
    ),
    ProjectModel(
      image: KImage.pejuang,
      name: "Pejuang",
      link: "https://play.google.com/store/apps/details?id=com.bdn.pejuang",
      description:
          "Membuat aplikasi untuk membantu pembayaran berbagai kebutuhan di masyarakat. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
      highlight: ["React Native"],
    ),
    ProjectModel(
      image: KImage.batumbu,
      name: "Batumbu",
      description:
          "Membuat aplikasi untuk mewadahi pemberi dana dan peminjam dana pada lingkungan UMKM. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
      link: "",
      highlight: ["Flutter"],
    ),
    ProjectModel(
      image: KImage.protect,
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
      image: KImage.primasaver,
      name: "Primasaver",
      description:
          "Ini adalah projek mengenai pembuatan aplikasi flutter dan backend golang untuk melakukan manajemen data pemakaian daya listrik dari pengguna",
      link: "https://primasaver.com/home",
      highlight: ["Flutter", "Go", "MongoDB"],
    ),
  ];
}
