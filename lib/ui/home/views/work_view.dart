import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_object.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/dialog_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/touchable_opacity_widget.dart';
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
                    child: TouchableOpacity(
                      onTap: () {
                        if (project.link.isNotEmpty) {
                          UrlUtil.launchUrl(context, project.link);
                        }
                      },
                      child: Container(
                        color: Colors.white,
                        padding: const EdgeInsets.all(16),
                        width: 360,
                        height: 240,
                        child: project.image.isEmpty
                            ? Center(
                                child: Text(
                                "not_found".tr(),
                                style: KTextStyle.title,
                              ))
                            : Image.asset(
                                project.image,
                                fit: BoxFit.contain,
                              ),
                      ),
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
                          Text(
                            project.name,
                            style: KTextStyle.title,
                          ),
                          const Gap.v(16),
                          SizedBox(
                            child: Card(
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Column(
                                  crossAxisAlignment:
                                      CrossAxisAlignment.stretch,
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
                                      onTap: () {
                                        showDialog(
                                          context: context,
                                          builder: (context) => DialogWidget(
                                            text: project.description,
                                          ),
                                        );
                                      },
                                      child: Text(
                                        "see_detail".tr(),
                                        textAlign:
                                            isReverse ? null : TextAlign.right,
                                        style: KTextStyle.subtitle
                                            .copyWith(color: Colors.blue),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          const Gap.v(16),
                          Container(
                            color: Colors.grey.withOpacity(0.3),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ...project.highlight.map((e) => Flexible(
                                      child: Padding(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 4.0),
                                        child: Text(
                                          e,
                                          style: KTextStyle.subtitle,
                                        ),
                                      ),
                                    ))
                              ],
                            ),
                          )
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
}
