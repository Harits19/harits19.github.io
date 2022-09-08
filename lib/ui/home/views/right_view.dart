import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/k_image.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/base/k_text.dart';
import 'package:harits_portofolio/ui/widgets/side_container.dart';

class RightView extends StatelessWidget {
  const RightView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SideContainer(children: [
      InkWell(
        onTap: () => KFunction.launchUrlEmail(context),
        child: const RotatedBox(
          quarterTurns: 1,
          child: Text(KText.email),
        ),
      ),
    ]);
  }
}
