import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/extensions/string_extension.dart';
import 'package:harits_portofolio/models/project_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/providers/app/app_notifier.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_object.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class WorkView extends ConsumerWidget {
  const WorkView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, ref) {
    return SectionContainer(
      titleText: "work".tr(ref),
      children: [
        ...List.generate(
          KObject.listProject(ref).length,
          (index) {
            final isReverse = (index % 2) != 0;
            final project = KObject.listProject(ref)[index];

            final projectName = Text(
              project.name,
              style: KTextStyle.title.copyWith(
                fontSize: Rspnsv.isMobile(context) ? KSize.s24 : null,
              ),
            );

            final projectDescription = Text(
              project.description,
              textAlign: Rspnsv.isMobile(context)
                  ? null
                  : isReverse
                      ? null
                      : TextAlign.right,
              style: KTextStyle.subtitle,
              overflow: TextOverflow.ellipsis,
              maxLines: 4,
            );

            final seeDetail = InkWell(
              onTap: () => _showDetailWork(context, project),
              child: Text(
                "see_detail".tr(ref),
                style: KTextStyle.subtitle.copyWith(color: Colors.blue),
              ),
            );

            if (Rspnsv.isMobile(context)) {
              return Padding(
                padding: const EdgeInsets.only(bottom: KSize.s16),
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: _ImageWorkWidget(project: project),
                    ),
                    Container(
                      color: (ref.watch(appProvider).isDarkMode
                              ? Colors.black
                              : Colors.white)
                          .withOpacity(0.7),
                      padding: const EdgeInsets.all(KSize.s16),
                      constraints: const BoxConstraints(
                        minHeight: 240,
                        minWidth: double.infinity,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          projectName,
                          const Gap.v(KSize.s32),
                          projectDescription,
                          seeDetail,
                          const Gap.v(KSize.s24),
                          _HighlightWidget(highlight: project.highlight),
                          const Gap.v(KSize.s16),
                          Row(
                            children: [
                              IconButton(
                                onPressed: () {
                                  UrlUtil.launchUrl(context, project.link);
                                },
                                icon: const Icon(
                                  FontAwesome5.external_link_alt,
                                  size: KSize.s16,
                                ),
                              ),
                              IconButton(
                                onPressed: () {},
                                icon: const Icon(
                                  FontAwesome5.github,
                                  size: KSize.s16,
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                    )
                  ],
                ),
              );
            }
            return Container(
              margin: const EdgeInsets.symmetric(vertical: 32),
              width: double.infinity,
              height: 240,
              child: Stack(
                children: [
                  Positioned(
                    right: isReverse ? 0 : null,
                    child: SizedBox(
                      width: 360,
                      height: 240,
                      child: _ImageWorkWidget(project: project),
                    ),
                  ),
                  Positioned(
                    right: isReverse ? null : 0,
                    child: SizedBox(
                      width: MediaQuery.of(context).size.width / 3,
                      // color: Colors.yellow,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: isReverse
                            ? CrossAxisAlignment.start
                            : CrossAxisAlignment.end,
                        children: [
                          projectName,
                          const Gap.v(KSize.s8),
                          _HighlightWidget(highlight: project.highlight),
                          const Gap.v(16),
                          SizedBox(
                            child: Card(
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Column(
                                  crossAxisAlignment: !isReverse
                                      ? CrossAxisAlignment.end
                                      : CrossAxisAlignment.start,
                                  children: [
                                    projectDescription,
                                    const Gap.v(8),
                                    seeDetail,
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            );
          },
        ),
      ],
    );
  }

  void _showDetailWork(BuildContext context, ProjectModel item) {
    showDialog(
      context: context,
      // isScrollControlled: true,
      // backgroundColor: Colors.transparent,
      builder: (context) {
        return Dialog(
          insetPadding: const EdgeInsets.all(KSize.s24),
          child: Padding(
            padding: const EdgeInsets.all(KSize.s40),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
                const Spacer(),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(KSize.s4),
                          width: KSize.s48,
                          height: KSize.s48,
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.all(
                              Radius.circular(
                                KSize.s48 / 2,
                              ),
                            ),
                          ),
                          child: Image.asset(
                            item.image,
                          ),
                        ),
                        const Gap.h(KSize.s16),
                        Text(
                          item.name,
                          style: KTextStyle.title.copyWith(
                            fontSize:
                                Rspnsv.isMobile(context) ? KSize.s24 : null,
                          ),
                        ),
                      ],
                    ),
                    const Gap.v(KSize.s16),
                    Text(
                      item.description,
                      style: KTextStyle.subtitle,
                    )
                  ],
                ),
                const Spacer(),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _HighlightWidget extends StatelessWidget {
  const _HighlightWidget({Key? key, required this.highlight}) : super(key: key);
  final List<String> highlight;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: KSize.s8,
      children: [
        ...highlight.map(
          (e) => Container(
            color: Colors.blue,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4.0),
              child: Text(
                e,
                style: KTextStyle.subtitle.copyWith(
                  color: Colors.white,
                ),
              ),
            ),
          ),
        )
      ],
    );
  }
}

class _ImageWorkWidget extends StatelessWidget {
  const _ImageWorkWidget({Key? key, required this.project}) : super(key: key);

  final ProjectModel project;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      child: Ink(
        child: InkWell(
          onTap: () {
            if (project.link.isNotEmpty) {
              UrlUtil.launchUrl(context, project.link);
            }
          },
          child: Padding(
            padding: const EdgeInsets.all(KSize.s16),
            child: Image.asset(
              project.image,
            ),
          ),
        ),
      ),
    );
  }
}
