import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class SectionContainer extends StatefulWidget {
  const SectionContainer({
    Key? key,
    this.children = const <Widget>[],
    this.titleText,
  }) : super(key: key);
  final List<Widget> children;
  final String? titleText;

  @override
  State<SectionContainer> createState() => _SectionContainerState();
}

class _SectionContainerState extends State<SectionContainer> {
  EdgeInsets _top = const EdgeInsets.only(
    top: KSize.s40,
  );

  double _opacity = 0;

  @override
  void initState() {
    super.initState();

    Future.delayed(Duration.zero).then((value) {
      _top = EdgeInsets.zero;
      _opacity = 1;
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    const duration = Duration(seconds: 2);
    const curves = Curves.fastOutSlowIn;
    return AnimatedPadding(
      duration: duration,
      curve: curves,
      padding: _top,
      child: AnimatedOpacity(
        duration: duration,
        curve: curves,
        opacity: _opacity,
        child: Padding(
          padding: KSize.paddingSection,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (widget.titleText != null) ...[
                Row(
                  children: [
                    Text(
                      widget.titleText!,
                      style: KTextStyle.title,
                    ),
                    const Gap.h(KSize.s16),
                    const Expanded(child: Divider()),
                    const Spacer(),
                  ],
                ),
                const Gap.v(16),
              ],
              ...widget.children.map((e) => e),
            ],
          ),
        ),
      ),
    );
  }
}
