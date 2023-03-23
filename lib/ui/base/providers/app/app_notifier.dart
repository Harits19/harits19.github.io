import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

part 'app_state.dart';

final appProvider =
    StateNotifierProvider<AppNotifier, AppState>((ref) => AppNotifier());

class AppNotifier extends StateNotifier<AppState> {
  AppNotifier() : super(AppState(themeMode: ThemeMode.dark));

  void toggleTheme() {
    final isLight = state.themeMode == ThemeMode.light;
    final changeThemeTo = isLight ? ThemeMode.dark : ThemeMode.light;
    state = state.copyWith(themeMode: changeThemeTo);
  }
}
