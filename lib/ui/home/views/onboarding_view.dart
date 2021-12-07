import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class OnboardingView extends StatelessWidget {
  const OnboardingView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      children: [
        subtitle(
          "Hi, my name is",
        ),
        const Text(
          "Abdullah Harits",
          style: TextStyle(fontSize: 56, fontWeight: FontWeight.w900),
        ),
        const Text(
          "I build mobile application",
          style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
        ),
        paddingV(8),
        subtitle(
          "I’m a mobile application developer specializing building with Flutter and React Native frameworks. Currently, I’m working on PT Skyshi Digital Indonesia",
        ),
        paddingV(24),
        OutlinedButton(
          onPressed: () async {},
          child: const Text("Get Started"),
        ),
      ],
    );
  }
}
