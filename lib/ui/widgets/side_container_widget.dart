import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:harits_portofolio/ui/widgets/animated_initial_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap_widget.dart';

class SideContainerWidget extends StatelessWidget {
  const SideContainerWidget({
    Key? key,
    this.children = const [],
    this.direction = VerticalDirection.down,
  }) : super(key: key);

  final List<Widget> children;
  final VerticalDirection direction;

  @override
  Widget build(BuildContext context) {
    if (Rspnsv.isMobile(context)) {
      return const SizedBox(
        width: KSize.s32,
      );
    }
    return Expanded(
      flex: 1,
      child: AnimatedInitialWidget(
        child: Column(
          verticalDirection: direction,
          children: [
            const GapWidget.v(KSize.s40),
            ...children.map((e) => e),
            const GapWidget.v(KSize.s16),
            () {
              return Expanded(
                child: LayoutBuilder(
                  builder: (context, constraint) {
                    return RotatedBox(
                      quarterTurns: direction == VerticalDirection.up ? 2 : 0,
                      child: ClipRect(
                        clipper: RectCustomClipper(constraint.maxHeight),
                        child: Column(
                          children: [
                            ...List.generate(
                              constraint.maxHeight ~/ KSize.s24 ~/ 2,
                              (index) => index % 2 == 0
                                  ? const _Line()
                                  : const GapWidget.v(KSize.s24),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              );
            }()
          ],
        ),
      ),
    );
  }
}

class _Line extends StatelessWidget {
  const _Line();

  @override
  Widget build(BuildContext context) {
    const circle = Icon(
      Icons.circle,
      size: KSize.s8,
      color: Colors.grey,
    );
    return Stack(
      children: [
        const Positioned.fill(
          child: Column(
            children: [
              circle,
              Spacer(),
              circle,
            ],
          ),
        ),
        Align(
          alignment: Alignment.center,
          child: Container(
            margin: const EdgeInsets.symmetric(vertical: KSize.s4),
            decoration: BoxDecoration(
              color: Colors.grey.shade300,
              borderRadius: BorderRadius.circular(KSize.s4),
            ),
            height: KSize.s24,
            width: KSize.s4,
          ),
        ),
      ],
    );
  }
}

class RectCustomClipper extends CustomClipper<Rect> {
  RectCustomClipper(this.height);

  final double height;

  @override
  Rect getClip(Size size) {
    return Rect.fromLTWH(0, 0, size.width, height - 54);
  }

  @override
  bool shouldReclip(covariant CustomClipper<Rect> oldClipper) =>
      oldClipper != this;
}
