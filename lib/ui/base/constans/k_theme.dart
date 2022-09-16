import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';

class KTheme {
  KTheme._();

  static final elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.blue,
      shadowColor: Colors.blue,
    ),
  );

  static final outlinedButtonTheme = OutlinedButtonThemeData(
    style: () {
      const color = Colors.blue;
      return OutlinedButton.styleFrom(
        foregroundColor: color,
        surfaceTintColor: color,
        shadowColor: color,
        side: const BorderSide(
          color: color,
        ),
        minimumSize: const Size(0, KSize.s48),
      );
    }(),
  );
}
