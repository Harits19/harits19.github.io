import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/ui/base/enum/app_language_enum.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_service.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_state.dart';
import 'package:yaml/yaml.dart';

final languageProvider = StateNotifierProvider<LanguageNotifier, LanguageState>(
    (ref) => LanguageNotifier());

class LanguageNotifier extends StateNotifier<LanguageState> {
  LanguageNotifier() : super(LanguageState(languageEnum: AppLanguageEnum.id));

  void toggleLanguage() {
    if (state.isEn) {
      state = LanguageState(languageEnum: AppLanguageEnum.id);
    } else if (state.isId) {
      state = LanguageState(languageEnum: AppLanguageEnum.en);
    }
  }
}

String tr(String key, WidgetRef ref) {
  var selectedLang = LanguageService.id;
  final langWatch = ref.watch(languageProvider);
  if (langWatch.isEn) {
    selectedLang = LanguageService.en;
  }
  if (langWatch.isId) {
    selectedLang = LanguageService.id;
  }
  final mapData = loadYaml(selectedLang) as Map;

  return mapData[key];
}

const defaultTr = tr;
