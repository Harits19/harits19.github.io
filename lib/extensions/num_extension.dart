import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';

extension DoubleExtension on num {
  double sp(BuildContext context) {
    return ResponsiveUtil.size(context, this);
  }
}
