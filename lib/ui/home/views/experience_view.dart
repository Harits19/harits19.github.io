import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/models/experience_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_object.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/base/providers/app/app_notifier.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/text_icon.dart';

class ExperienceView extends StatefulWidget {
  const ExperienceView({Key? key}) : super(key: key);

  @override
  State<ExperienceView> createState() => _ExperienceViewState();
}

class _ExperienceViewState extends State<ExperienceView> {
  int activeTab = 0;
  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: tr('experience'),
      children: [
        ...KObject.listExperience.map(
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
                const Gap.h(KSize.s16),
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
                      const Gap.v(KSize.s8),
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
          const Gap.v(16),
          ...item.jobDesc.map((e) => TextIcon(e)),
        ],
      ),
    );
  }
}
