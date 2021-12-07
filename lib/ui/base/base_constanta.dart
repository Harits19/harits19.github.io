import 'package:flutter/material.dart';
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
  const OnboardingView(),
  const AboutMeView(),
  const ExperienceView(),
  const WorkView(),
  const ContactView(),
  const SizedBox(
    height: 1000,
  )
];
