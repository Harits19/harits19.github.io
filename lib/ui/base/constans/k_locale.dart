import 'package:flutter/material.dart';

class KLocale {
  KLocale._();
  
  static const translationPath = 'assets/translations';
  static const id = Locale('id', 'ID');
  static const en = Locale('en', 'US');
  static const supportedLocales = [id, en];
}
