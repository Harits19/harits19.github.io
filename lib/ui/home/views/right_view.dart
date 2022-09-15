import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/widgets/side_container.dart';

class RightView extends StatelessWidget {
  const RightView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SideContainer(
      children: [
        InkWell(
          onTap: () => UrlUtil.launchUrlEmail(context),
          child: const RotatedBox(
            quarterTurns: 1,
            child: Text(KText.email),
          ),
        ),
      ],
    );
  }
}
