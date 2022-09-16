import 'package:bloc/bloc.dart';
import 'package:harits_portofolio/ui/base/constans/k_enum.dart';

part 'home_state.dart';

class HomeCubit extends Cubit<HomeState> {
  HomeCubit()
      : super(HomeState(
          currentIndexView: Header.home.index,
        ));

  set currentIndexView(int? newIndex) {
    emit(
      state.copyWith(
        currentIndexView: newIndex,
      ),
    );
  }
}
