import 'package:flutter/material.dart';

class GapWidget extends StatelessWidget {
  const GapWidget.v(double? size, {Key? key})
      : width = null,
        height = size,
        super(key: key);

  const GapWidget.h(double? size, {Key? key})
      : width = size,
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
