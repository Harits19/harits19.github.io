import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';

part 'app_state.dart';

class AppCubit extends Cubit<AppState> {
  AppCubit() : super(AppState(themeMode: ThemeMode.light));

  void toggleTheme() {
    final isLight = state.themeMode == ThemeMode.light;
    final changeThemeTo = isLight ? ThemeMode.dark : ThemeMode.light;
    emit(state.copyWith(
      themeMode: changeThemeTo,
    ));
  }
}
