import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_style.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/text_icon.dart';

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
                child: Text(
                  "I am Abdullah Harits, graduated from Information Technology Universitas Brawijaya in 2021. I have experience as a fullstack developer. I have an interest in a career as a Flutter, Go and the latest technologies or frameworks. Known as a fast learner and likes to work on projects on time.",
                  style: S.tStyle.subtitle,
                ),
              ),
              const Gap.h(8),
              Image.asset(
                KImage.profile,
                fit: BoxFit.cover,
                height: 200,
                width: 150,
              )
            ],
          ),
        ),
        const Gap.v(16),
        Text(
          "Skills & Competencies:",
          style: S.tStyle.title,
        ),
        const Gap.v(8),
        Row(
          children: [
            Expanded(
              child: Column(
                children: [...KText.listOfSkill1.map((e) => TextIcon(e))],
              ),
            ),
            Expanded(
              child: Column(
                children: [...KText.listOfSkill2.map((e) => TextIcon(e))],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
