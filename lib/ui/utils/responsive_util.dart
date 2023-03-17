import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';

typedef Rspnsv = ResponsiveUtil;

class ResponsiveUtil {
  static bool isDesktop(BuildContext context) => !isMobile(context);

  static double width(BuildContext context) {
    return MediaQuery.of(context).size.width;
  }

  static bool isMobile(BuildContext context) {
    debugPrint('width $width');
    return width(context) <= KSize.mobileWidth;
  }

  static double size(BuildContext context, num size) {
    return isMobile(context)
        ? KSize.mobileWidth / KSize.desktopWidth * size
        : size.toDouble();
  }
}
