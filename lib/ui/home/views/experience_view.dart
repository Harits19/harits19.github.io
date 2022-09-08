import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_object.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/text_icon.dart';

class ExperienceView extends StatelessWidget {
  const ExperienceView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: tr('experience'),
      children: [...KObject.listExperience.map((e) => _buildWorkExperience(e))],
    );
  }

  Widget _buildWorkExperience(ExperienceModel item) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              width: 80,
              child: Text(
                item.company,
                style: KTextStyle.subtitle,
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
                    item.position,
                    style: KTextStyle.subtitle.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Gap.v(8),
                  Text(
                    item.time,
                    style: KTextStyle.subtitle,
                  ),
                  const Gap.v(16),
                  ...item.jobDesc.map((e) => TextIcon(e)),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
