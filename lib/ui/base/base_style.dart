import 'package:flutter/material.dart';

class S {
  static const paddingSection = EdgeInsets.symmetric(vertical: 40);
  static const tStyle = _TextStyle();
}

class _TextStyle {
  const _TextStyle();
  TextStyle get title => const TextStyle(
        fontSize: 32,
        fontWeight: FontWeight.bold,
      );

  TextStyle get subtitle => const TextStyle(
        fontSize: 16,
      );
}
