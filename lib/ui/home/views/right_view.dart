import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/widgets/side_container.dart';

class RightView extends StatelessWidget {
  const RightView({Key? key}) : super(key: key);

  static List<Widget> items(BuildContext context) => [
        InkWell(
          onTap: () => UrlUtil.launchUrlEmail(context),
          child: RotatedBox(
            quarterTurns: Rspnsv.isDesktop(context) ? 1 : 0,
            child: const Text(KText.email),
          ),
        ),
      ];

  @override
  Widget build(BuildContext context) {
    return SideContainer(
      children: [
        ...items(context),
      ],
    );
  }
}
