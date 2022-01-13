import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_style.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/text_icon.dart';

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
              Flexible(
                child: Text(
                  "Skyshi",
                  style: S.tStyle.subtitle,
                ),
              ),
              const VerticalDivider(
                color: Colors.black,
              ),
              Flexible(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "Mobile Developer",
                      style: S.tStyle.subtitle.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Gap.v(8),
                    Text(
                      "21 February 2021 - present",
                      style: S.tStyle.subtitle,
                    ),
                    const Gap.v(16),
                    ...C.string.listSkyshiExperience.map((e) => TextIcon(e)),
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
