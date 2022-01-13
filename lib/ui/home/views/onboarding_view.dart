import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_style.dart';
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
          style: S.tStyle.subtitle,
        ),
        const Text(
          "Abdullah Harits",
          style: TextStyle(fontSize: 56, fontWeight: FontWeight.w900),
        ),
        const Text(
          "I build mobile application",
          style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
        ),
        const Gap.v(8),
        Text(
          "I’m a mobile application developer specializing building with Flutter and React Native frameworks. Currently, I’m working on PT Skyshi Digital Indonesia",
          style: S.tStyle.subtitle,
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
