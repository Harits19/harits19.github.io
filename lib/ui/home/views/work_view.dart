import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/touchable_opacity_widget.dart';

class WorkView extends StatelessWidget {
  const WorkView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "Work",
      children: [
        ...List.generate(
          listProject.length,
          (index) {
            final isReverse = (index % 2) != 0;
            final project = listProject[index];
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
                          launchUrl(context, project.link);
                        }
                      },
                      child: Container(
                        color: Colors.grey,
                        width: 360,
                        height: 240,
                        child: project.image.isEmpty
                            ? Center(child: title("Not Found"))
                            : Image.network(
                                project.image,
                                fit: BoxFit.cover,
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
                          title(project.name),
                          paddingV(16),
                          SizedBox(
                            child: Card(
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: subtitle(
                                  project.description,
                                  textAlign: isReverse ? null : TextAlign.right,
                                ),
                              ),
                            ),
                          ),
                          paddingV(16),
                          Container(
                            color: Colors.grey.withOpacity(0.3),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ...project.highlight.map((e) => Flexible(
                                      child: Padding(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 4.0),
                                        child: subtitle(
                                          e,
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
