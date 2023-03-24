import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';

typedef Rspnsv = ResponsiveUtil;

class ResponsiveUtil {
  static bool isDesktop(BuildContext context) => !isMobile(context);

  static double width(BuildContext context) {
    return MediaQuery.of(context).size.width;
  }

  static bool isMobile(BuildContext context) {
    return width(context) <= KSize.mobileWidth;
  }


}
