part of 'app_cubit.dart';

class AppState {
  final ThemeMode themeMode;

  AppState({required this.themeMode});

  AppState copyWith({ThemeMode? themeMode}) {
    return AppState(
      themeMode: themeMode ?? this.themeMode,
    );
  }

  bool get isDarkMode {
    return themeMode == ThemeMode.dark;
  }

  bool get isLightMode => !isDarkMode;
}
