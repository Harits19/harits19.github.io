import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/home/views/left_view.dart';
import 'package:harits_portofolio/ui/home/views/right_view.dart';
import 'package:harits_portofolio/ui/widgets/gap_widget.dart';

class BottomView extends StatelessWidget {
  const BottomView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const GapWidget.v(KSize.s32),
        const PoweredBy(),
        const GapWidget.v(KSize.s8),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: LeftView.items(context),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: RightView.items(context),
        ),
        const GapWidget.v(KSize.s32),
      ],
    );
  }
}
