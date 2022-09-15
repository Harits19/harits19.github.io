import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/widgets/animated_initial_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class SideContainer extends StatelessWidget {
  const SideContainer({
    Key? key,
    this.children = const [],
    this.reverse = false,
  }) : super(key: key);

  final List<Widget> children;
  final bool reverse;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 1,
      child: AnimatedInitialWidget(
        child: Column(
          verticalDirection:
              reverse ? VerticalDirection.up : VerticalDirection.down,
          children: [
            Gap.v(KSize.s40),
            ...children.map((e) => e),
            Gap.v(KSize.s16),
            () {
              final circle = Icon(
                Icons.circle,
                size: KSize.s8.value,
                color: Colors.grey,
              );

              final line = Stack(
                children: [
                  Positioned.fill(
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
                      margin:  EdgeInsets.symmetric(vertical: KSize.s4.value),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade300,
                        borderRadius: BorderRadius.circular(KSize.s4.value),
                      ),
                      height: KSize.s24.value,
                      width: KSize.s4.value,
                    ),
                  ),
                ],
              );

              return Expanded(
                child: LayoutBuilder(
                  builder: (context, constraint) {
                    return RotatedBox(
                      quarterTurns: reverse ? 2 : 0,
                      child: ClipRect(
                        clipper: RectCustomClipper(constraint.maxHeight),
                        child: Column(
                          children: [
                            ...List.generate(
                              constraint.maxHeight ~/ KSize.s24.value ~/ 2,
                              (index) => index % 2 == 0
                                  ? line
                                  :  Gap.v(KSize.s24),
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
