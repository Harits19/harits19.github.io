import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

class HomeState {
  final ItemScrollController controller;
  final int activeMenuIndex;
  final ItemPositionsListener positionsListener;
  final bool isScrolling;

  HomeState({
    required this.controller,
    required this.activeMenuIndex,
    required this.positionsListener,
    required this.isScrolling,
  });

  HomeState copyWith({
    ItemScrollController? controller,
    int? activeMenuIndex,
    ItemPositionsListener? positionsListener,
    bool? isScrolling,
  }) {
    return HomeState(
      controller: controller ?? this.controller,
      activeMenuIndex: activeMenuIndex ?? this.activeMenuIndex,
      positionsListener: positionsListener ?? this.positionsListener,
      isScrolling: isScrolling ?? this.isScrolling,
    );
  }
}
