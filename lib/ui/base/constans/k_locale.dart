import 'package:flutter/material.dart';

class KLocale {
  KLocale._();

  static const translationPath = 'assets/translations';
  static final supportedLocales =
      KLocaleEnum.values.map((e) => e.locale).toList();
}

enum KLocaleEnum {
  id(locale: Locale('id', 'ID')),
  en(locale: Locale('en', 'US'));

  const KLocaleEnum({required this.locale});

  final Locale locale;
}


// TODO remove