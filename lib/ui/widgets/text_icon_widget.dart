import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';

class TextIconWidget extends StatelessWidget {
  const TextIconWidget(this.text, {Key? key, this.color}) : super(key: key);

  final String text;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: IntrinsicHeight(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const VerticalDivider(),
            Expanded(
              child: Text(
                text,
                style: KTextStyle.subtitle.copyWith(
                  color: color,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
