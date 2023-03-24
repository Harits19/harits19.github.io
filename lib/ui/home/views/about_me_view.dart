import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/extensions/string_extension.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_notifier.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/grid_view_view.dart';
import 'package:harits_portofolio/ui/widgets/text_icon.dart';

class AboutMeView extends ConsumerWidget {
  const AboutMeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, ref) {
    final image = Image.asset(
      KAsset.profile,
      fit: BoxFit.cover,
      height: 200,
      width: 150,
    );
    final desc = Expanded(
      child: Text(
        tr('about_me_desc', ref),
        style: KTextStyle.subtitle,
      ),
    );
    return SectionContainer(
      titleText: "about_me".tr(ref),
      children: [
        IntrinsicHeight(
          child: Rspnsv.isMobile(context)
              ? Column(
                  children: [desc, const Gap.v(KSize.s16), image],
                )
              : Row(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [desc, const Gap.h(8), image],
                ),
        ),
        const Gap.v(16),
        Text(
          tr('skill_competencies', ref),
          style: KTextStyle.title,
        ),
        const Gap.v(8),
        GridViewView<String>(
          list: KText.listOfSkill,
          crossAxisCount: 2,
          renderItem: (e) {
            return TextIcon(e);
          },
        )
      ],
    );
  }
}
