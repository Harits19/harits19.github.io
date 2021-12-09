import 'package:flutter/material.dart';
import 'package:harits_portofolio/models/project_model.dart';
import 'package:harits_portofolio/ui/home/views/about_me_view.dart';
import 'package:harits_portofolio/ui/home/views/contact_view.dart';
import 'package:harits_portofolio/ui/home/views/experience_view.dart';
import 'package:harits_portofolio/ui/home/views/onboarding_view.dart';
import 'package:harits_portofolio/ui/home/views/work_view.dart';

const email = "harits.abdullah19@gmail.com";
const listOfSkill1 = [
  "Flutter",
  "React Native",
  "Android Native",
  "Object Oriented Programming",
];

const listOfSkill2 = [
  "CI/CD",
  "GIT",
  "Functional Programming",
];

const listHeader = ["About", "Experience", "Work", "Contact"];

const listSkyshiExperience = [
  "Creating mobile applications using Flutter framework or React Native",
  "Implementing mobile applications based on Business Process Documentation",
  "Fixed bugs found from UAT documentation",
  "Integrating mobile application with API and Firebase",
  "Creating mobile application according to design",
];

const listBody = [
  OnboardingView(),
  AboutMeView(),
  ExperienceView(),
  WorkView(),
  ContactView(),
  SizedBox(
    height: 1000,
  )
];

final listProject = [
  ProjectModel(
    image: "",
    name: "AyoLunas",
    link: "",
    description:
        "Mengerjakan projek ini setelah mempelajari tentang Flutter. Sebagian besar ditugaskan untuk menyelesaikan bug-bug yang ada. Tetapi juga ditugaskan untuk mengerjakan beberapa implementasi design dan integrasi API.",
    highlight: ["Flutter"],
  ),
  ProjectModel(
    image:
        "https://play-lh.googleusercontent.com/9PlBEk4LoA8BpyngdeJa1uDX9SxwhukcPof6pK0rjqsjMOM6T8sOAW-fSQmM-ROTnlw=s180-rw",
    name: "Soundfren",
    description:
        "Mengerjakan projek ini sekaligus mempelajari React Native. Ditugaskan untuk membantu mengembangkan dan mengimplementasikan program 1000 startup pada aplikasi Soundfren. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
    link: "https://play.google.com/store/apps/details?id=com.amoeba.soundfren",
    highlight: ["React Native"],
  ),
  ProjectModel(
    image:
        "https://play-lh.googleusercontent.com/DMcMgfnGI-8sj1p9pCC9OuPxXqONZwqQRYIiTo2eaS4L_NWiW-3BRwJwHLcMJMNt0FA=s180-rw",
    name: "Pejuang",
    link: "https://play.google.com/store/apps/details?id=com.bdn.pejuang",
    description:
        "Membuat aplikasi untuk membantu pembayaran berbagai kebutuhan di masyarakat. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
    highlight: ["React Native"],
  ),
  ProjectModel(
    image: "",
    name: "Batumbu",
    description:
        "Membuat aplikasi untuk mewadahi pemberi dana dan peminjam dana pada lingkungan UMKM. Didalamnya saya mengimplementasikan desain, mengintegrasikan API, dan menyelesaikan bug-bug yang ada.",
    link: "",
    highlight: ["Flutter"],
  ),
];
