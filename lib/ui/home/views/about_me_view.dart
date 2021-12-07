import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class AboutMeView extends StatelessWidget {
  const AboutMeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "About Me",
      children: [
        IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                child: subtitle(
                    "I am Abdullah Harits, graduated from Information Technology Universitas Brawijaya in 2021. I have experience as a mobile developer with Flutter and React Native frameworks at PT Skyshi Digital Indonesia. I have an interest in a career as a mobile developer and proficient in understanding the latest technologies or frameworks. Known as a fast learner and likes to work on projects on time. "),
              ),
              paddingH(8),
              Expanded(
                child: Container(
                  color: Colors.grey,
                  child: const Center(child: Text("Image")),
                ),
              )
            ],
          ),
        ),
        paddingV(16),
        title("Skills & Competencies:"),
        paddingV(8),
        Row(
          children: [
            Expanded(
              child: Column(
                children: [...listOfSkill1.map((e) => textWithIcon(e))],
              ),
            ),
            Expanded(
              child: Column(
                children: [...listOfSkill2.map((e) => textWithIcon(e))],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
