import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/text_icon.dart';

class AboutMeView extends StatelessWidget {
  const AboutMeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "about_me".tr(),
      children: [
        IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                child: Text(
                  tr('about_me_desc'),
                  style: KTextStyle.subtitle,
                ),
              ),
              const Gap.h(8),
              Image.asset(
                KAsset.profile,
                fit: BoxFit.cover,
                height: 200,
                width: 150,
              )
            ],
          ),
        ),
        const Gap.v(16),
        Text(
          tr('skill_competencies'),
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