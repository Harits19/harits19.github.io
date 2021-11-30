import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';

class LeftView extends StatelessWidget {
  const LeftView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return sideContainer(
      reverse: true,
      children: [
        const Text(
          "Powered by Flutter Web",
          style: TextStyle(fontSize: 8),
        ),
        IconButton(
          icon: const Icon(FontAwesome5.linkedin),
          onPressed: () {
            launchUrl(context, "https://linkedin.com/in/abd-harits");
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.instagram),
          onPressed: () {
            launchUrl(context, "https://instagram.com/abd.harits19");
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.github),
          onPressed: () {
            launchUrl(context, "https://github.com/Harits19");
          },
        ),
      ],
    );
  }
}
