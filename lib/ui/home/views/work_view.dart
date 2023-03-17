import 'package:flutter/material.dart';
import 'package:harits_portofolio/models/project_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_object.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:easy_localization/easy_localization.dart';

class WorkView extends StatelessWidget {
  const WorkView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "work".tr(),
      children: [
        ...List.generate(
          KObject.listProject.length,
          (index) {
            final isReverse = (index % 2) != 0;
            final project = KObject.listProject[index];
            return Container(
              margin: const EdgeInsets.symmetric(vertical: 32),
              width: double.infinity,
              height: 240,
              child: Stack(
                children: [
                  Positioned(
                    right: isReverse ? 0 : null,
                    child: _ImageWorkWidget(project: project),
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
                          Text(
                            project.name,
                            style: KTextStyle.title,
                          ),
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
                                    Text(
                                      project.description,
                                      textAlign:
                                          isReverse ? null : TextAlign.right,
                                      style: KTextStyle.subtitle,
                                      overflow: TextOverflow.ellipsis,
                                      maxLines: 4,
                                    ),
                                    const Gap.v(8),
                                    InkWell(
                                      onTap: () =>
                                          _showDetailWork(context, project),
                                      child: Text(
                                        "see_detail".tr(),
                                        style: KTextStyle.subtitle
                                            .copyWith(color: Colors.blue),
                                      ),
                                    ),
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
                IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Expanded(child: _ImageWorkWidget(project: item)),
                      const VerticalDivider(),
                      Expanded(
                        flex: 2,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item.name,
                              style: KTextStyle.title,
                            ),
                            const Gap.v(KSize.s8),
                            _HighlightWidget(highlight: item.highlight),
                            const Gap.v(KSize.s16),
                            Text(
                              item.description,
                              style: KTextStyle.subtitle,
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
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
        width: 360,
        height: 240,
        child: InkWell(
          onTap: () {
            if (project.link.isNotEmpty) {
              UrlUtil.launchUrl(context, project.link);
            }
          },
          child: Padding(
            padding: const EdgeInsets.all(KSize.s16),
            child: Image.asset(project.image),
          ),
        ),
      ),
    );
  }
}
