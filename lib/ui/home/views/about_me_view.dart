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
import 'package:harits_portofolio/ui/widgets/gap_widget.dart';
import 'package:harits_portofolio/ui/widgets/grid_view_widget.dart';
import 'package:harits_portofolio/ui/widgets/text_icon_widget.dart';

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
                  children: [desc, const GapWidget.v(KSize.s16), image],
                )
              : Row(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [desc, const GapWidget.h(8), image],
                ),
        ),
        const GapWidget.v(16),
        Text(
          tr('skill_competencies', ref),
          style: KTextStyle.title,
        ),
        const GapWidget.v(8),
        GridViewWidget<String>(
          list: KText.listOfSkill,
          crossAxisCount: 2,
          renderItem: (e) {
            return TextIconWidget(e);
          },
        )
      ],
    );
  }
}
