import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_curves.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';

class AnimatedInitialWidget extends StatefulWidget {
  const AnimatedInitialWidget({Key? key, this.child}) : super(key: key);

  final Widget? child;

  @override
  State<AnimatedInitialWidget> createState() => _AnimatedInitialWidgetState();
}

class _AnimatedInitialWidgetState extends State<AnimatedInitialWidget> {
  EdgeInsets _top = const EdgeInsets.only(
    top: KSize.s40,
  );

  double _opacity = 0;

  @override
  void initState() {
    super.initState();

    Future.delayed(KDuration.d0.value).then((value) {
      _top = EdgeInsets.zero;
      _opacity = 1;
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    final duration = KDuration.d2000.value;
    final curves = KCurves.kFastOutSlowIn.value;
    return AnimatedPadding(
      duration: duration,
      curve: curves,
      padding: _top,
      child: AnimatedOpacity(
        duration: duration,
        curve: curves,
        opacity: _opacity,
        child: widget.child,
      ),
    );
  }
}
