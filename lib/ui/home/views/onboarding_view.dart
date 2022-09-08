import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class OnboardingView extends StatelessWidget {
  const OnboardingView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      children: [
        Text(
          "Hi, my name is",
          style: KTextStyle.subtitle,
        ),
        const Text(
          "Abdullah Harits",
          style: TextStyle(fontSize: 56, fontWeight: FontWeight.w900),
        ),
        const Text(
          "I fullstack developer",
          style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
        ),
        const Gap.v(8),
        Text(
          "I’m a fullstack developer specializing building with Flutter and Go Language. Currently, I’m working on PT Imani Prima.",
          style: KTextStyle.subtitle,
        ),
        const Gap.v(24),
        OutlinedButton(
          onPressed: () async {},
          child: const Text("Get Started"),
        ),
      ],
    );
  }
}
