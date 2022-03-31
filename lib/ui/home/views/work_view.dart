import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/base/base_style.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/widgets/touchable_opacity_widget.dart';

class WorkView extends StatelessWidget {
  const WorkView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "Work",
      children: [
        ...List.generate(
          C.object.listProject.length,
          (index) {
            final isReverse = (index % 2) != 0;
            final project = C.object.listProject[index];
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
                          F.launchUrl(context, project.link);
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
                                "Not Found",
                                style: S.tStyle.title,
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
                            style: S.tStyle.title,
                          ),
                          const Gap.v(16),
                          SizedBox(
                            child: Card(
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Text(
                                  project.description,
                                  textAlign: isReverse ? null : TextAlign.right,
                                  style: S.tStyle.subtitle,
                                  overflow: TextOverflow.ellipsis,
                                  maxLines: 5,
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
                                          style: S.tStyle.subtitle,
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
