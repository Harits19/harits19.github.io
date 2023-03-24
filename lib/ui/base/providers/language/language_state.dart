import 'package:harits_portofolio/ui/base/enum/app_language_enum.dart';

class LanguageState {
  final AppLanguageEnum languageEnum;

  bool get isId => languageEnum == AppLanguageEnum.id;
  bool get isEn => languageEnum == AppLanguageEnum.en;

  LanguageState({required this.languageEnum});
}
