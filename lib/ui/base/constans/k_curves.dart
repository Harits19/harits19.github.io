import 'package:flutter/material.dart';

enum KCurves {
  fastOutSlowIn(Curves.fastOutSlowIn);

  const KCurves(this.value);

  final Cubic value;
}
