import 'package:flutter/services.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';

class LanguageService {
  static String? en;
  static String? id;

  static Future<void> init() async {
    en = await rootBundle.loadString(KAsset.en);
    id = await rootBundle.loadString(KAsset.id);
  }
}
