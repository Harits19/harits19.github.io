import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';

class RightView extends StatelessWidget {
  const RightView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return sideContainer(children: [
      InkWell(
        onTap: () {
          Uri emailLaunchUri = Uri(
            scheme: 'mailto',
            path: email,
          );
          launchUrl(context, emailLaunchUri.toString());
        },
        child: const RotatedBox(
          quarterTurns: 1,
          child: Text(email),
        ),
      ),
    ]);
  }
}
