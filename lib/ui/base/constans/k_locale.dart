import 'package:flutter/material.dart';

class KLocale {
  KLocale._();

  static const translationPath = 'assets/translations',
      id = Locale('id', 'ID'),
      en = Locale('en', 'US'),
      supportedLocales = [id, en];
}
