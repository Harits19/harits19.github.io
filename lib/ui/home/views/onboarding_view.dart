import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';

class OnboardingView extends StatelessWidget {
  const OnboardingView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        paddingV(40),
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
          "I am Abdullah Harits, graduated from Information Technology Universitas Brawijaya in 2021. I have experience as a mobile developer with Flutter and React Native frameworks at PT Skyshi Digital Indonesia. I have an interest in a career as a mobile developer and proficient in understanding the latest technologies or frameworks. Known as a fast learner and likes to work on projects on time. ",
        ),
        paddingV(24),
        OutlinedButton(
          onPressed: () async {},
          child: const Text("Get Started"),
        ),
        paddingV(80),
      ],
    );
  }
}
