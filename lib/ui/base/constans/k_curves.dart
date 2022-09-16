import 'package:flutter/material.dart';

enum KCurves {
  kFastOutSlowIn(Curves.fastOutSlowIn);

  const KCurves(this._curves);

  final Cubic _curves;

  Cubic get value => _curves;
}
