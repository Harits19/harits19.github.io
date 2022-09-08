import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_locale.dart';
import 'package:harits_portofolio/ui/home/views/about_me_view.dart';
import 'package:harits_portofolio/ui/home/views/contact_view.dart';
import 'package:harits_portofolio/ui/home/views/experience_view.dart';
import 'package:harits_portofolio/ui/home/views/header_view.dart';
import 'package:harits_portofolio/ui/home/views/left_view.dart';
import 'package:harits_portofolio/ui/home/views/onboarding_view.dart';
import 'package:harits_portofolio/ui/home/views/right_view.dart';
import 'package:harits_portofolio/ui/home/views/work_view.dart';
import 'package:harits_portofolio/ui/widgets/dialog_widget.dart';
import 'package:scroll_to_index/scroll_to_index.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _controller = AutoScrollController();

  List<Widget> get _listBody {
    return const [
      OnboardingView(),
      AboutMeView(),
      ExperienceView(),
      WorkView(),
      ContactView(),
      SizedBox(
        height: 1000,
      )
    ];
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HeaderView(
              onTapHeader: (selectedIndex) {
                _controller.scrollToIndex(
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
                  Expanded(
                    flex: 3,
                    child: ListView(
                        padding: const EdgeInsets.all(4),
                        physics: const BouncingScrollPhysics(),
                        controller: _controller,
                        children: _listBody.map<Widget>((e) {
                          final index = _listBody.indexOf(e);
                          return AutoScrollTag(
                            key: ValueKey(index),
                            controller: _controller,
                            index: index,
                            child: _listBody[index],
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

  _showUnderDevelopmentDialog(BuildContext context) async {
    showDialog(
        context: context,
        builder: (BuildContext context) =>
            DialogWidget(text: "under_development".tr()));
  }
}
