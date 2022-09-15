import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_locale.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';

class Gap extends StatelessWidget {
  Gap.v(KSize? size, {Key? key})
      : width = null,
        height = size?.value,
        super(key: key);

  Gap.h(KSize? size, {Key? key})
      : width = size?.value,
        height = null,
        super(key: key);

  final double? width, height;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      width: width,
    );
  }
}
