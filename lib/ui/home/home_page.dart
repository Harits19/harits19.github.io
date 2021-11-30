import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/about_me_view.dart';
import 'package:harits_portofolio/ui/home/views/header_view.dart';
import 'package:harits_portofolio/ui/home/views/left_view.dart';
import 'package:harits_portofolio/ui/home/views/onboarding_view.dart';
import 'package:harits_portofolio/ui/home/views/right_view.dart';
import 'package:scroll_to_index/scroll_to_index.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final controller = AutoScrollController();
  int selectedIndex = 0;
  late final ItemScrollController itemScrollController;
  late final ItemPositionsListener itemPositionsListener;

  @override
  void initState() {
    super.initState();
    itemScrollController = ItemScrollController();
    itemPositionsListener = ItemPositionsListener.create();
  }

  @override
  void dispose() {
    super.dispose();
    controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final listBody = [
      const OnboardingView(),
      const AboutMeView(),
      const Text("Experience"),
      const Text("Work"),
      const Text("Contact"),
    ];
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HeaderView(
              onTapHeader: (selectedIndex) {
                controller.scrollToIndex(
                  selectedIndex + 1,
                  preferPosition: AutoScrollPosition.begin,
                );
              },
            ),
            const Divider(
              height: 0,
            ),
            Expanded(
              child: Row(
                children: [
                  const LeftView(),
                  // Expanded(
                  //     flex: 3,
                  //     child: PageView(
                  //       scrollDirection: Axis.vertical,
                  //       onPageChanged: (index) {},
                  //       children: listBody,
                  //       // allowImplicitScrolling: true,
                  //     )),

                  // Expanded(
                  //   flex: 3,
                  //   child: ScrollablePositionedList.builder(
                  //     itemCount: 500,
                  //     itemBuilder: (context, index) => Text('Item $index'),
                  //     itemScrollController: itemScrollController,
                  //     shrinkWrap: true,
                  //     itemPositionsListener: itemPositionsListener,
                  //   ),
                  // ),

                  Expanded(
                    flex: 3,
                    child: ListView(
                        padding: const EdgeInsets.all(4),
                        physics: const BouncingScrollPhysics(),
                        controller: controller,
                        children: listBody.map<Widget>((e) {
                          final index = listBody.indexOf(e);
                          return AutoScrollTag(
                            key: ValueKey(index),
                            controller: controller,
                            index: index,
                            child: listBody[index],
                            highlightColor: Colors.black.withOpacity(0.1),
                          );
                        }).toList()),
                  ),
                  const RightView(),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
