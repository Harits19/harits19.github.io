import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/base/providers/home/home_notifier.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_notifier.dart';
import 'package:harits_portofolio/ui/home/home_page.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap_widget.dart';

class OnboardingView extends ConsumerWidget {
  const OnboardingView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, ref) {
    return SectionContainer(
      children: [
        const GapWidget.v(KSize.s48),
        Text(
          tr('my_name_is', ref),
          style: KTextStyle.subtitle,
        ),
        const Text(
          KText.abdullahHarits,
          style: TextStyle(
            fontSize: 56,
            fontWeight: FontWeight.w900,
          ),
        ),
        Text(
          tr('i_full_stack_dev', ref),
          style: const TextStyle(
            fontSize: 48,
            fontWeight: FontWeight.bold,
          ),
        ),
        const GapWidget.v(8),
        Text(
          tr('onboarding_desc', ref),
          style: KTextStyle.subtitle,
        ),
        const GapWidget.v(24),
        OutlinedButton(
          onPressed: () async {
            ref.read(homeProvider.notifier).scroll(Menus.aboutMe.index);
          },
          child: Text(tr("get_started", ref)),
        ),
      ],
    );
  }
}
