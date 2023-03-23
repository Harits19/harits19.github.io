// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/models/menu_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/providers/home/home_notifier.dart';
import 'package:harits_portofolio/ui/home/views/about_me_view.dart';
import 'package:harits_portofolio/ui/home/views/contact_view.dart';
import 'package:harits_portofolio/ui/home/views/experience_view.dart';
import 'package:harits_portofolio/ui/home/views/header_view.dart';
import 'package:harits_portofolio/ui/home/views/left_view.dart';
import 'package:harits_portofolio/ui/home/views/menu_view.dart';
import 'package:harits_portofolio/ui/home/views/onboarding_view.dart';
import 'package:harits_portofolio/ui/home/views/right_view.dart';
import 'package:harits_portofolio/ui/home/views/work_view.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

class HomePage extends ConsumerStatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  @override
  Widget build(BuildContext context) {
    final homeWatch = ref.watch(homeProvider);
    final homeRead = ref.read(homeProvider.notifier);
    final _listBody = <MenuModel>[
      MenuModel(text: "Home", view: OnboardingView()),
      MenuModel(text: "About Me", view: AboutMeView()),
      MenuModel(text: "Experience", view: ExperienceView()),
      MenuModel(text: "Work", view: WorkView()),
      MenuModel(text: "Contact", view: ContactView()),
      if (Rspnsv.isMobile(context))
        MenuModel(
          text: "",
          view: Column(
            children: [
              Gap.v(KSize.s32),
              LeftView.poweredBy,
              Gap.v(KSize.s8),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: LeftView.items(context),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: RightView.items(context),
              ),
              Gap.v(KSize.s32),
            ],
          ),
        ),
      MenuModel(
        text: "",
        view: SizedBox(
          height: 1000,
        ),
      )
    ];

    return Scaffold(
      endDrawer: Drawer(
        child: MenuView(
          menus: _listBody,
          onTapMenu: (value) {
            homeRead.scroll(value);
            Navigator.pop(context);
          },
        ),
      ),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HeaderView(
              menus: _listBody,
              onTapMenu: homeRead.scroll,
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
                    child: ScrollablePositionedList.builder(
                      itemPositionsListener: homeWatch.positionsListener,
                      itemCount: _listBody.length,
                      itemScrollController: homeWatch.controller,
                      itemBuilder: ((context, index) {
                        return _listBody[index].view;
                      }),
                    ),
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
