import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';

class SectionContainer extends StatelessWidget {
  const SectionContainer({
    Key? key,
    this.children = const <Widget>[],
    this.titleText,
  }) : super(key: key);
  final List<Widget> children;
  final String? titleText;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: paddingSection(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (titleText != null) ...[
            title(titleText!),
            paddingV(16),
          ],
          ...children.map((e) => e),
        ],
      ),
    );
  }
}
