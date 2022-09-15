import 'package:flutter/material.dart';

enum KLocale {
  id(Locale('id', 'ID')),
  en(Locale('en', 'US'));

  static const translationPath = ('assets/translations');
  static final supportedLocales = KLocale.values.map((e) => e.value).toList();

  const KLocale(this.value);
  final Locale value;
}
