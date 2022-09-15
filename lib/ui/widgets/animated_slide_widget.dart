import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_curves.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';

class AnimatedSlideWidget extends StatefulWidget {
  const AnimatedSlideWidget({
    Key? key,
    this.child,
    this.onHalfEnd,
  }) : super(key: key);
  final Widget? child;
  final VoidCallback? onHalfEnd;

  @override
  State<AnimatedSlideWidget> createState() => _AnimatedSlideWidgetState();
}

class _AnimatedSlideWidgetState extends State<AnimatedSlideWidget> {
  Offset _offset = const Offset(0, -2);

  @override
  void initState() {
    super.initState();
    Future.delayed(KDuration.d100.value).then((value) {
      if (widget.onHalfEnd == null) return;
      widget.onHalfEnd!();
    });
    Future.delayed(KDuration.d0.value).then((value) {
      _offset = Offset.zero;
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSlide(
      duration: KDuration.d500.value,
      offset: _offset,
      curve: KCurves.kFastOutSlowIn.value,
      child: widget.child,
    );
  }
}
