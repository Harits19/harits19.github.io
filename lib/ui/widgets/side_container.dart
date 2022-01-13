import 'package:flutter/material.dart';
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
          const Gap.v(40),
          ...children.map((e) => e),
          const Gap.v(24),
          const Expanded(
              child: VerticalDivider(
            thickness: 4,
          ))
        ],
      ),
    );
  }
}
