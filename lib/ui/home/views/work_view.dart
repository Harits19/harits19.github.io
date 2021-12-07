import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class WorkView extends StatelessWidget {
  const WorkView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "Work",
      children: [
        ...List.generate(
          [1, 1, 1].length,
          (index) {
            final isReverse = (index % 2) != 0;
            return Container(
              margin: EdgeInsets.symmetric(vertical: 32),
              width: double.infinity,
              height: 240,
              child: Stack(
                children: [
                  Positioned(
                    right: isReverse ? 0 : null,
                    child: Material(
                      color: Colors.grey,
                      child: InkWell(
                        onTap: () {},
                        child: const SizedBox(
                          width: 360,
                          height: 240,
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
                          title("Pejuang"),
                          paddingV(16),
                          Card(
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: subtitle(
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
                                textAlign: isReverse ? null : TextAlign.right,
                              ),
                            ),
                          ),
                          paddingV(16),
                          Container(
                            color: Colors.yellow.withOpacity(0.3),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ...[
                                  1,
                                  1,
                                ].map((e) => Flexible(
                                      child: Padding(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 4.0),
                                        child: subtitle(
                                          "React Native",
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
