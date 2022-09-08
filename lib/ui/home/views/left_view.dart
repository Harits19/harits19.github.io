import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/widgets/side_container.dart';
import 'package:easy_localization/easy_localization.dart';

class LeftView extends StatelessWidget {
  const LeftView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SideContainer(
      reverse: true,
      children: [
        Text(
          tr("powered_flutter"),
          style: const TextStyle(fontSize: 8),
        ),
        IconButton(
          icon: const Icon(FontAwesome5.linkedin),
          onPressed: () {
            UrlUtil.launchUrl(context, KText.linkedIn);
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.instagram),
          onPressed: () {
            UrlUtil.launchUrl(context, KText.instagram);
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.github),
          onPressed: () {
            UrlUtil.launchUrl(context, KText.github);
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.medium_m),
          onPressed: () {
            UrlUtil.launchUrl(context, KText.medium);
          },
        ),
      ],
    );
  }
}
