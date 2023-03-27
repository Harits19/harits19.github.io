import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_profile.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';

import 'package:harits_portofolio/ui/widgets/side_container_widget.dart';

class RightView extends StatelessWidget {
  const RightView({Key? key}) : super(key: key);

  static List<Widget> items(BuildContext context) => [
        InkWell(
          onTap: () => UrlUtil.launchUrlEmail(context),
          child: RotatedBox(
            quarterTurns: Rspnsv.isDesktop(context) ? 1 : 0,
            child: const Text(KProfile.email),
          ),
        ),
      ];

  @override
  Widget build(BuildContext context) {
    return SideContainerWidget(
      children: [
        ...items(context),
      ],
    );
  }
}
