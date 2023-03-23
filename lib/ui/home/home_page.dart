// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:harits_portofolio/ui/base/constans/k_curves.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/home/views/about_me_view.dart';
import 'package:harits_portofolio/ui/home/views/contact_view.dart';
import 'package:harits_portofolio/ui/home/views/experience_view.dart';
import 'package:harits_portofolio/ui/home/views/header_view.dart';
import 'package:harits_portofolio/ui/home/views/left_view.dart';
import 'package:harits_portofolio/ui/home/views/menu_view.dart';
import 'package:harits_portofolio/ui/home/views/onboarding_view.dart';
import 'package:harits_portofolio/ui/home/views/right_view.dart';
import 'package:harits_portofolio/ui/home/views/work_view.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _itemScrollController = ItemScrollController();
  final ItemPositionsListener? _itemPositionListener =
      ItemPositionsListener.create();

  bool _isScrolling = false;

  @override
  void initState() {
    super.initState();
    _itemPositionListener?.itemPositions.addListener(_positionListener);
  }

  @override
  void dispose() {
    super.dispose();
    _itemPositionListener?.itemPositions.removeListener(_positionListener);
  }

  void _positionListener() async {
    final homeRead = context.read<HomeCubit>();
    final itemPosition = _itemPositionListener?.itemPositions.value;
    if (itemPosition?.isEmpty ?? true) return;
    final item = itemPosition!.reduce((value, element) {
      if (value.itemLeadingEdge < element.itemLeadingEdge) {
        return value;
      }
      return element;
    });
    final currentIndex = item.index;
    if (homeRead.state.currentIndexView == currentIndex || _isScrolling) {
      return;
    }
    homeRead.currentIndexView = currentIndex;
  }

  @override
  Widget build(BuildContext context) {
    final _listBody = [
      OnboardingView(),
      AboutMeView(),
      ExperienceView(),
      WorkView(),
      ContactView(),
      Column(
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
      )
    ];

    return Scaffold(
      endDrawer: Drawer(
        child: MenuView(
          onTapMenu: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: SafeArea(
        child: BlocListener<HomeCubit, HomeState>(
          listener: (context, state) async {
            final currentIndex = state.currentIndexView;
            _isScrolling = true;
            setState(() {});
            await _itemScrollController.scrollTo(
              index: currentIndex,
              duration: KDuration.d300,
              curve: KCurves.kFastOutSlowIn,
            );
            _isScrolling = false;
            setState(() {});
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              HeaderView(),
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
                        itemPositionsListener: _itemPositionListener,
                        itemCount: _listBody.length,
                        itemScrollController: _itemScrollController,
                        itemBuilder: ((context, index) {
                          return _listBody[index];
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
      ),
    );
  }
}
