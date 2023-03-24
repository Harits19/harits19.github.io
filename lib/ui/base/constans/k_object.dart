import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/extensions/string_extension.dart';
import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/models/project_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';

class KObject {

  static List<String> _jobDesc(String prefix, int length, WidgetRef ref) {
    return List.generate(length,
        (index) => (prefix + "_job_desc_" + (index + 1).toString()).tr(ref));
  }

  static List<ExperienceModel> listExperience(WidgetRef ref) => [
        ExperienceModel(
          company: "PT. Skyshi Digital Indonesia",
          position: "mobile_developer".tr(ref),
          time: "skyshi_time".tr(ref),
          image: KAsset.skyshi,
          jobDesc: _jobDesc('skyshi', 5, ref),
        ),
        ExperienceModel(
          company: "PT. Imani Prima",
          position: "fullstack_developer".tr(ref),
          time: "imani_time".tr(ref),
          image: KAsset.imaniPrima,
          jobDesc: _jobDesc('imani', 9, ref),
        ),
        ExperienceModel(
          company: "PT. Smartfren Telecom Tbk",
          position: "mobile_ui_engineer".tr(ref),
          time: "smartfren_time".tr(ref),
          image: KAsset.smarfren,
          jobDesc: _jobDesc('smartfren', 6, ref),
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
      ].reversed.toList();
      static List<ProjectModel>
      listProject(WidgetRef ref) => [
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
          description: "primasaver_desc".tr(ref),
          link: "https://primasaver.com/home",
          highlight: ["Flutter", "Go", "MongoDB"],
        ),
      ].reversed.toList();
}
