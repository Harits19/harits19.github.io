import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';

class ResponsiveWidget extends StatelessWidget {
  const ResponsiveWidget({
    super.key,
    required this.desktop,
    required this.mobile,
  });

  final Widget desktop;
  final Widget mobile;

  static bool isDesktop(BuildContext context) => !isMobile(context);

  static bool isMobile(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width <= KSize.mobileView;
  }

  @override
  Widget build(BuildContext context) {
    if (isMobile(context)) {
      return mobile;
    }
    return desktop;
  }
}
