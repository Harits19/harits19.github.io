import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/widgets/side_container.dart';
import 'package:easy_localization/easy_localization.dart';

class _IconModel {
  final IconData iconData;
  final String url;

  _IconModel({required this.iconData, required this.url});
}

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
        ...[
          _IconModel(iconData: FontAwesome5.linkedin, url: KText.linkedIn),
          _IconModel(iconData: FontAwesome5.instagram, url: KText.instagram),
          _IconModel(iconData: FontAwesome5.github, url: KText.github),
          _IconModel(iconData: FontAwesome5.medium, url: KText.medium),
          _IconModel(iconData: FontAwesome5.google_play, url: KText.googlePlay),
        ].map(
          (e) => IconButton(
            icon: Icon(e.iconData),
            tooltip: e.url,
            onPressed: () {
              UrlUtil.launchUrl(context, e.url);
            },
          ),
        ),
      ],
    );
  }
}
