import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/k_image.dart';
import 'package:harits_portofolio/ui/base/k_text.dart';
import 'package:harits_portofolio/ui/base/k_textstyle.dart';
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
              const Expanded(
                child: Text(
                  "I am Abdullah Harits, graduated from Information Technology Universitas Brawijaya in 2021. I have experience as a fullstack developer. I have an interest in a career as a Flutter, Go and the latest technologies or frameworks. Known as a fast learner and likes to work on projects on time.",
                  style: KTextStyle.subtitle,
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
        const Text(
          "Skills & Competencies:",
          style: KTextStyle.title,
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
