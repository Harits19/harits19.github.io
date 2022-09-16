part of 'home_cubit.dart';

class HomeState {
  final int currentIndexView;
  HomeState({required this.currentIndexView});

  HomeState copyWith({int? currentIndexView}) {
    return HomeState(
      currentIndexView: currentIndexView ?? this.currentIndexView,
    );
  }
}
