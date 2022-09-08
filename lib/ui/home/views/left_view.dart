import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/widgets/side_container.dart';

class LeftView extends StatelessWidget {
  const LeftView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SideContainer(
      reverse: true,
      children: [
        const Text(
          "Powered by Flutter Web",
          style: TextStyle(fontSize: 8),
        ),
        IconButton(
          icon: const Icon(FontAwesome5.linkedin),
          onPressed: () {
            KFunction.launchUrl(context, "https://linkedin.com/in/abd-harits");
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.instagram),
          onPressed: () {
            KFunction.launchUrl(context, "https://instagram.com/abd.harits19");
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.github),
          onPressed: () {
            KFunction.launchUrl(context, "https://github.com/Harits19");
          },
        ),
        IconButton(
          icon: const Icon(FontAwesome5.medium_m),
          onPressed: () {
            KFunction.launchUrl(
                context, "https://harits-abdullah19.medium.com");
          },
        ),
      ],
    );
  }
}
