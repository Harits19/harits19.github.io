import 'package:flutter/material.dart';

enum KSize {
  
  s16(16),
  s48(48),
  s4(4),
  s40(40),
  s24(24),
  s8(8),
  s80(80);

  const KSize(this.value);

  final double value;
  static const paddingSection = EdgeInsets.symmetric(vertical: 40);
}
