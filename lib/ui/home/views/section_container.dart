import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

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
      padding: KSize.paddingSection,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (titleText != null) ...[
            Row(
              children: [
                Text(
                  titleText!,
                  style: KTextStyle.title,
                ),
                const Gap.h(KSize.s16),
                const Expanded(child: Divider()),
                const Spacer(),
              ],
            ),
            const Gap.v(16),
          ],
          ...children.map((e) => e),
        ],
      ),
    );
  }
}
