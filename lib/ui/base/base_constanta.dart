import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/models/project_model.dart';

class C {
  static const text = _Text();
  static const object = _Object();
  static const img = _Image();
}

class _Image {
  const _Image();
  String get profile => "assets/profile.jpg";
  String get protect => "assets/protect.webp";
  String get ayoLunas => "assets/ayolunas.png";
  String get soundfren => "assets/soundfren.webp";
  String get pejuang => "assets/pejuang.webp";
  String get batumbu => "assets/batumbu.png";
  String get tuntun => "assets/tuntun.png";
  String get primasaver => "assets/primasaver.png";
}

class _Text {
  const _Text();

  String get email => "harits.abdullah19@gmail.com";
  List<String> get listOfSkill1 => [
        "Flutter",
        "React Native",
        "Object Oriented Programming",
        "MongoDB",
        "MySQL",
      ];

  List<String> get listOfSkill2 => [
        "CI/CD",
        "GIT",
        "Functional Programming",
        "Go",
      ];

  List<String> get listHeader => ["About", "Experience", "Work", "Contact"];
}

class _Object {
  const _Object();

  List<ExperienceModel> get listExperience => [
        ExperienceModel(
          company: "PT. Skyshi Digital Indonesia",
          position: "Mobile Developer",
          time: "February 2021 - March 2022",
          jobDesc: [
            "Creating mobile applications using Flutter framework or React Native",
            "Implementing mobile applications based on Business Process Documentation",
            "Fixed bugs found from UAT documentation",
            "Integrating mobile application with API and Firebase",
            "Creating mobile application according to design",
          ],
        ),
        ExperienceModel(
          company: "PT. Imani Prima",
          position: "Fullstack Developer",
          time: "March 2021 - present",
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
          company: "Tuntun Les Privat",
          position: "Fullstack Developer",
          time: "January 2022 - present",
          jobDesc: [
            "Creating mobile applications using Flutter",
            "Implementing mobile applications based on Business Process Documentation",
            "Fixed bugs found from UAT documentation",
            "Integrating mobile application with API and Firebase",
            "Creating mobile application according to design",
            "Creating API using Go Language",
            "Management database MongoDB",
          ],
        ),
      ];

  List<ProjectModel> get listProject => [
        ProjectModel(
          image: C.img.ayoLunas,
          name: "AyoLunas",
          link: "",
          description:
              "Mengerjakan projek ini setelah mempelajari tentang Flutter. Sebagian besar ditugaskan untuk menyelesaikan bug-bug yang ada. Tetapi juga ditugaskan untuk mengerjakan beberapa implementasi design dan integrasi API.",
          highlight: ["Flutter"],
        ),
        ProjectModel(
          image: C.img.soundfren,
          name: "Soundfren",
          description:
              "Mengerjakan projek ini sekaligus mempelajari React Native. Ditugaskan untuk membantu mengembangkan dan mengimplementasikan program 1000 startup pada aplikasi Soundfren. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
          link:
              "https://play.google.com/store/apps/details?id=com.amoeba.soundfren",
          highlight: ["React Native"],
        ),
        ProjectModel(
          image: C.img.pejuang,
          name: "Pejuang",
          link: "https://play.google.com/store/apps/details?id=com.bdn.pejuang",
          description:
              "Membuat aplikasi untuk membantu pembayaran berbagai kebutuhan di masyarakat. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
          highlight: ["React Native"],
        ),
        ProjectModel(
          image: C.img.batumbu,
          name: "Batumbu",
          description:
              "Membuat aplikasi untuk mewadahi pemberi dana dan peminjam dana pada lingkungan UMKM. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
          link: "",
          highlight: ["Flutter"],
        ),
        ProjectModel(
          image: C.img.protect,
          name: "Protect",
          description:
              "Ini adalah projek pribadi saya. Tujuannya untuk mengisi waktu dan memenuhi kebutuhan mengenai penyimpanan dan pembuat password yang disimpan secara lokal",
          link:
              "https://play.google.com/store/apps/details?id=com.my_password_app",
          highlight: ["Flutter"],
        ),
        ProjectModel(
          image: C.img.tuntun,
          name: "Tuntun Les Privat",
          description:
              "Ini adalah projek bersama teman saya. Tujuannya untuk mengisi waktu dan membantu kebutuhan les privat yang ada di Yogyakarta",
          link: "",
          highlight: ["Flutter", "Go", "MongoDB"],
        ),
        ProjectModel(
          image: C.img.primasaver,
          name: "Primasaver",
          description:
              "Ini adalah projek mengenai pembuatan aplikasi flutter dan backend golang untuk melakukan manajemen data pemakaian daya listrik dari pengguna",
          link: "https://primasaver.com/home",
          highlight: ["Flutter", "Go", "MongoDB"],
        ),
      ];
}
