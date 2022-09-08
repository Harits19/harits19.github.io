import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';

class TextIcon extends StatelessWidget {
  const TextIcon(this.text, {Key? key, this.color}) : super(key: key);

  final String text;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: IntrinsicHeight(
        child: Row(
          children: [
            const VerticalDivider(),
            Flexible(
                child: Text(
              text,
              style: KTextStyle.subtitle.copyWith(
                color: color,
              ),
            )),
          ],
        ),
      ),
    );
  }
}
