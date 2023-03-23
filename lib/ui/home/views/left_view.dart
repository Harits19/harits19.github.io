import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';
import 'package:harits_portofolio/ui/widgets/side_container.dart';
import 'package:easy_localization/easy_localization.dart';

class IconModel {
  final IconData iconData;
  final String url;

  IconModel({required this.iconData, required this.url});
}

class LeftView extends StatelessWidget {
  const LeftView({Key? key}) : super(key: key);

  static List<Widget> items(BuildContext context) => [
        ...[
          IconModel(iconData: FontAwesome5.linkedin, url: KText.linkedIn),
          IconModel(iconData: FontAwesome5.instagram, url: KText.instagram),
          IconModel(iconData: FontAwesome5.github, url: KText.github),
          IconModel(iconData: FontAwesome5.medium, url: KText.medium),
          IconModel(iconData: FontAwesome5.google_play, url: KText.googlePlay),
        ].map(
          (e) => IconButton(
            icon: Icon(e.iconData),
            tooltip: e.url,
            onPressed: () {
              UrlUtil.launchUrl(context, e.url);
            },
          ),
        ),
      ];

  static final poweredBy = Text(
    tr("powered_flutter"),
    style: const TextStyle(fontSize: 8),
  );
  @override
  Widget build(BuildContext context) {
    return SideContainer(
      reverse: true,
      children: [...items(context)],
    );
  }
}
