import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/home/views/left_view.dart';
import 'package:harits_portofolio/ui/home/views/right_view.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class BottomView extends StatelessWidget {
  const BottomView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Gap.v(KSize.s32),
        LeftView.poweredBy,
        Gap.v(KSize.s8),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: LeftView.items(context),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: RightView.items(context),
        ),
        Gap.v(KSize.s32),
      ],
    );
  }
}
