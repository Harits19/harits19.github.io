import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/ui/base/constans/k_curves.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';
import 'package:harits_portofolio/ui/base/providers/home/home_state.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

final homeProvider =
    StateNotifierProvider<HomeNotifier, HomeState>((ref) => HomeNotifier());

class HomeNotifier extends StateNotifier<HomeState> {
  HomeNotifier()
      : super(
          HomeState(
            controller: ItemScrollController(),
            activeMenuIndex: 0,
            positionsListener: ItemPositionsListener.create(),
            isScrolling: false,
          ),
        ) {
    state.positionsListener.itemPositions.addListener(_positionListener);
  }

  void _positionListener() async {
    if (state.isScrolling) return;
    final itemPosition = state.positionsListener.itemPositions.value;
    if (itemPosition.isEmpty) return;
    final item = itemPosition.reduce((value, element) {
      if (value.itemLeadingEdge < element.itemLeadingEdge) {
        return value;
      }
      return element;
    });
    state = state.copyWith(activeMenuIndex: item.index);
  }

  void scroll(index) async {
    state = state.copyWith(isScrolling: true);
    await state.controller.scrollTo(
      index: index,
      duration: KDuration.d300,
      curve: KCurves.defaultCurves,
    );
    state = state.copyWith(isScrolling: false);
  }

  @override
  void dispose() {
    super.dispose();
    state.positionsListener.itemPositions.removeListener(_positionListener);
  }
}
