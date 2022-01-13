import 'package:flutter/material.dart';

class Gap extends StatelessWidget {
  const Gap.v(double? size, {Key? key})
      : width = null,
        heigth = size,
        super(key: key);

  const Gap.h(double? size, {Key? key})
      : width = size,
        heigth = null,
        super(key: key);

  final double? width, heigth;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: heigth,
      width: width,
    );
  }
}
