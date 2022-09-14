import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
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
      child: Column(
        verticalDirection:
            reverse ? VerticalDirection.up : VerticalDirection.down,
        children: [
          const Gap.v(KSize.s40),
          ...children.map((e) => e),
          const Gap.v(KSize.s16),
          () {
            const circle = Icon(
              Icons.circle,
              size: KSize.s8,
              color: Colors.grey,
            );

            final line = Stack(
              children: [
                Positioned.fill(
                  child: Column(
                    children: const [
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

            return Expanded(
              child: LayoutBuilder(
                builder: (context, constraint) {
                  print(
                      'max height: ${constraint.maxHeight}, height: ${MediaQuery.of(context).size.height}');
                  return RotatedBox(
                    quarterTurns: reverse ? 2 : 0,
                    child: ClipRect(
                      clipper: RectCustomClipper(constraint.maxHeight),
                      child: Column(children: [
                        ...List.generate(
                          constraint.maxHeight ~/ KSize.s24,
                          (index) =>
                              index % 2 == 0 ? line : const Gap.v(KSize.s24),
                        ),
                      ]),
                    ),
                  );
                },
              ),
            );
          }()
        ],
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
