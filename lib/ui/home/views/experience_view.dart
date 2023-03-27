import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_profile.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/base/providers/app/app_notifier.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_notifier.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap_widget.dart';
import 'package:harits_portofolio/ui/widgets/text_icon_widget.dart';

class ExperienceView extends ConsumerStatefulWidget {
  const ExperienceView({Key? key}) : super(key: key);

  @override
  ConsumerState<ExperienceView> createState() => _ExperienceViewState();
}

class _ExperienceViewState extends ConsumerState<ExperienceView> {
  int activeTab = 0;
  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: tr('experience', ref),
      children: [
        ...KProfile.listExperience(ref).map(
          (e) => _WorkExperience(item: e),
        ),
      ],
    );
  }
}

class _WorkExperience extends ConsumerWidget {
  const _WorkExperience({
    required this.item,
  });

  final ExperienceModel item;

  @override
  Widget build(BuildContext context, ref) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.all(KSize.s16),
            child: Row(
              children: [
                CircleAvatar(
                  backgroundColor: Colors.white,
                  radius: KSize.s48,
                  child: Image.asset(
                    item.image,
                    width: KSize.s48,
                  ),
                ),
                const GapWidget.h(KSize.s16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      RichText(
                        text: TextSpan(
                          style: TextStyle(
                            color: ref.watch(appProvider).isDarkMode
                                ? Colors.white
                                : Colors.black,
                          ),
                          children: [
                            TextSpan(
                              text: item.company,
                              style: KTextStyle.subtitle.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            TextSpan(
                              text: '\n(${item.time})',
                              style: KTextStyle.subtitle2
                                  .copyWith(fontStyle: FontStyle.italic),
                            )
                          ],
                        ),
                      ),
                      const GapWidget.v(KSize.s8),
                      Container(
                        padding: const EdgeInsets.all(KSize.s4),
                        color: Colors.blue,
                        child: Text(
                          item.position,
                          style: KTextStyle.subtitle.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const GapWidget.v(16),
          ...item.jobDesc.map((e) => TextIconWidget(e)),
        ],
      ),
    );
  }
}
