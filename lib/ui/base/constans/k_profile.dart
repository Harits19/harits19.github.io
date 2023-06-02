import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/extensions/string_extension.dart';
import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/models/project_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';

class KProfile {
  static List<ExperienceModel> listExperience(WidgetRef ref) => [
        ExperienceModel(
          company: "PT. Skyshi Digital Indonesia",
          position: "mobile_developer".tr(ref),
          time: "skyshi_time".tr(ref),
          image: KAsset.skyshi,
          jobDesc: 'skyshi_job_desc'.tr(ref),
        ),
        ExperienceModel(
          company: "PT. Imani Prima",
          position: "fullstack_developer".tr(ref),
          time: "imani_time".tr(ref),
          image: KAsset.imaniPrima,
          jobDesc: 'imani_job_desc'.tr(ref),
        ),
        ExperienceModel(
          company: "PT. Smartfren Telecom Tbk",
          position: "mobile_ui_engineer".tr(ref),
          time: "smartfren_time".tr(ref),
          image: KAsset.smarfren,
          jobDesc: 'smartfren_job_desc'.tr(ref),
        ),
      ].reversed.toList();

  static List<ProjectModel> listProject(WidgetRef ref) => [
        ProjectModel(
          image: KAsset.ayoLunas,
          name: "AyoLunas",
          link: "",
          description: "ayolunas_desc".tr(ref),
          highlight: ["Flutter"],
        ),
        ProjectModel(
          image: KAsset.soundfren,
          name: "Soundfren",
          description: "soundfren_desc".tr(ref),
          link:
              "https://play.google.com/store/apps/details?id=com.amoeba.soundfren",
          highlight: ["React Native"],
        ),
        ProjectModel(
          image: KAsset.pejuang,
          name: "Pejuang",
          link: "https://play.google.com/store/apps/details?id=com.bdn.pejuang",
          description: "pejuang_desc".tr(ref),
          highlight: ["React Native"],
        ),
        ProjectModel(
          image: KAsset.batumbu,
          name: "Batumbu",
          description: "batumbu_desc".tr(ref),
          link: "",
          highlight: ["Flutter"],
        ),
        ProjectModel(
          image: KAsset.protect,
          name: "Protect",
          description: "protect_desc".tr(ref),
          link:
              "https://play.google.com/store/apps/details?id=com.my_password_app",
          highlight: ["Flutter"],
        ),
        ProjectModel(
          image: KAsset.primasaver,
          name: "Primasaver",
          description: "primasaver_desc".tr(ref),
          link: "https://primasaver.com/home",
          highlight: ["Flutter", "Go", "MongoDB"],
        ),
        ProjectModel(
          image: KAsset.prayerTime,
          name: "Prayer Time",
          link: "https://play.google.com/store/apps/details?id=com.prayer_time",
          description: "prayer_time_desc".tr(ref),
          highlight: ["Flutter"],
        ),
      ].reversed.toList();

  static const email = "harits.abdullah19@gmail.com",
      resume =
          "https://docs.google.com/document/d/1sG-A9ulHr12cY02n_0s_DS6hUrgpGsopaEGPfsZP0uo/edit?usp=sharing",
      resumeDownload =
          'https://docs.google.com/document/d/1sG-A9ulHr12cY02n_0s_DS6hUrgpGsopaEGPfsZP0uo/export?format=pdf',
      linkedIn = "https://linkedin.com/in/abd-harits",
      instagram = "https://instagram.com/abd.harits19",
      github = "https://github.com/Harits19",
      medium = "https://harits-abdullah19.medium.com",
      googlePlay =
          'https://play.google.com/store/apps/developer?id=Abdullah+Harits',
      abdullahHarits = 'Abdullah Harits',
      listOfSkill = [
        "Flutter",
        "React Native",
        "Object Oriented Programming",
        "MongoDB",
        "MySQL",
        "CI/CD",
        "GIT",
        "Functional Programming",
        "Go",
        "Mobile Application Developer"
      ];
}
