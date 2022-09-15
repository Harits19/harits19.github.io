import 'package:bloc/bloc.dart';

part 'home_state.dart';

class HomeCubit extends Cubit<HomeState> {
  HomeCubit() : super(HomeState(currentIndexView: null));

  set currentIndexView(int? newIndex) {
    emit(
      state.copyWith(
        currentIndexView: newIndex,
      ),
    );
  }
}
