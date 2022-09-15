import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/home/views/about_me_view.dart';
import 'package:harits_portofolio/ui/home/views/contact_view.dart';
import 'package:harits_portofolio/ui/home/views/experience_view.dart';
import 'package:harits_portofolio/ui/home/views/header_view.dart';
import 'package:harits_portofolio/ui/home/views/left_view.dart';
import 'package:harits_portofolio/ui/home/views/onboarding_view.dart';
import 'package:harits_portofolio/ui/home/views/right_view.dart';
import 'package:harits_portofolio/ui/home/views/work_view.dart';
import 'package:harits_portofolio/ui/widgets/dialog_widget.dart';
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
  late final homeRead = context.read<HomeCubit>();
  final _duration = const Duration(milliseconds: 300);
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
    final item =
        _itemPositionListener?.itemPositions.value.reduce((value, element) {
      if (value.itemLeadingEdge < element.itemLeadingEdge) {
        return value;
      }
      return element;
    });
    final currentIndex = item?.index;
    if (currentIndex == null ||
        item?.itemLeadingEdge == null ||
        homeRead.state.currentIndexView == currentIndex ||
        _isScrolling) {
      return;
    }
    homeRead.currentIndexView = currentIndex - 1;
  }

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
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HeaderView(
              onTapHeader: (selectedIndex) async {
                _isScrolling = true;
                setState(() {});
                await _itemScrollController.scrollTo(
                  index: selectedIndex + 1,
                  duration: _duration,
                  curve: Curves.fastOutSlowIn,
                );
                _isScrolling = false;
                homeRead.currentIndexView = selectedIndex;
                setState(() {});
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
    );
  }

  _showUnderDevelopmentDialog(BuildContext context) async {
    showDialog(
        context: context,
        builder: (BuildContext context) =>
            DialogWidget(text: "under_development".tr()));
  }
}
