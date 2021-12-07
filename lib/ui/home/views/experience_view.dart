import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class ExperienceView extends StatelessWidget {
  const ExperienceView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "Experience",
      children: [
        IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Flexible(child: subtitle("Skyshi")),
              const VerticalDivider(
                color: Colors.black,
              ),
              Flexible(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    subtitle(
                      "Mobile Developer",
                      fontWeight: FontWeight.bold,
                    ),
                    paddingV(8),
                    subtitle("21 February 2021 - present"),
                    paddingV(16),
                    ...listSkyshiExperience.map((e) => textWithIcon(e)),
                  ],
                ),
              )
            ],
          ),
        )
      ],
    );
  }
}
