import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/models/project_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:easy_localization/easy_localization.dart';

class KObject {
  const KObject._();

  static List<String> _jobDesc(String prefix, int length) {
    return List.generate(length,
        (index) => (prefix + "_job_desc_" + (index + 1).toString()).tr());
  }

  static final listExperience = [
    ExperienceModel(
      company: "PT. Skyshi Digital Indonesia",
      position: "mobile_developer".tr(),
      time: "skyshi_time".tr(),
      image: KAsset.skyshi,
      jobDesc: _jobDesc('skyshi', 5),
    ),
    ExperienceModel(
      company: "PT. Imani Prima",
      position: "fullstack_developer".tr(),
      time: "imani_time".tr(),
      image: KAsset.imaniPrima,
      jobDesc: _jobDesc('imani', 9),
    ),
    ExperienceModel(
      company: "PT. Smartfren Telecom Tbk",
      position: "mobile_ui_engineer".tr(),
      time: "smartfren_time".tr(),
      image: KAsset.smarfren,
      jobDesc: _jobDesc('smartfren', 6),
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

  static final listProject = [
    ProjectModel(
      image: KAsset.ayoLunas,
      name: "AyoLunas",
      link: "",
      description: "ayolunas_desc".tr(),
      highlight: ["Flutter"],
    ),
    ProjectModel(
      image: KAsset.soundfren,
      name: "Soundfren",
      description: "soundfren_desc".tr(),
      link:
          "https://play.google.com/store/apps/details?id=com.amoeba.soundfren",
      highlight: ["React Native"],
    ),
    ProjectModel(
      image: KAsset.pejuang,
      name: "Pejuang",
      link: "https://play.google.com/store/apps/details?id=com.bdn.pejuang",
      description: "pejuang_desc".tr(),
      highlight: ["React Native"],
    ),
    ProjectModel(
      image: KAsset.batumbu,
      name: "Batumbu",
      description: "",
      link: "",
      highlight: ["Flutter"],
    ),
    ProjectModel(
      image: KAsset.protect,
      name: "Protect",
      description: "protect_desc".tr(),
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
      description: "primasaver_desc".tr(),
      link: "https://primasaver.com/home",
      highlight: ["Flutter", "Go", "MongoDB"],
    ),
  ];
}
