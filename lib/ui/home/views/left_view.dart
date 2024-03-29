import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/models/icon_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_profile.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_notifier.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';
import 'package:harits_portofolio/ui/widgets/side_container_widget.dart';

class LeftView extends ConsumerWidget {
  const LeftView({Key? key}) : super(key: key);

  static List<Widget> items(BuildContext context) => [
        ...[
          IconModel(iconData: FontAwesome5.linkedin, url: KProfile.linkedIn),
          IconModel(iconData: FontAwesome5.instagram, url: KProfile.instagram),
          IconModel(iconData: FontAwesome5.github, url: KProfile.github),
          IconModel(iconData: FontAwesome5.medium, url: KProfile.medium),
          IconModel(
              iconData: FontAwesome5.google_play, url: KProfile.googlePlay),
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

  @override
  Widget build(BuildContext context, ref) {
    return SideContainerWidget(
      direction: VerticalDirection.up,
      children: [const PoweredBy(), ...items(context)],
    );
  }
}

class PoweredBy extends ConsumerWidget {
  const PoweredBy({
    super.key,
  });

  @override
  Widget build(BuildContext context, ref) {
    return Text(
      tr("powered_flutter", ref),
      style: const TextStyle(fontSize: 8),
    );
  }
}
