import 'package:harits_portofolio/ui/base/constans/k_asset.dart';

enum AppLanguageEnum {
  id(path: KAsset.id),
  en(path: KAsset.en);

  const AppLanguageEnum({
    required this.path,
  });

  final String path;
}
