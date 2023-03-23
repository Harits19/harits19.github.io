import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/extensions/num_extension.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class OnboardingView extends ConsumerWidget {
  const OnboardingView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, ref) {
    return SectionContainer(
      children: [
        const Gap.v(KSize.s48),
        Text(
          tr('my_name_is'),
          style: KTextStyle.subtitle,
        ),
        Text(
          KText.abdullahHarits,
          style: TextStyle(
            fontSize: 56.sp(context),
            fontWeight: FontWeight.w900,
          ),
        ),
        Text(
          tr('i_full_stack_dev'),
          style: TextStyle(
            fontSize: 48.sp(context),
            fontWeight: FontWeight.bold,
          ),
        ),
        const Gap.v(8),
        Text(
          tr('onboarding_desc'),
          style: KTextStyle.subtitle,
        ),
        const Gap.v(24),
        OutlinedButton(
          onPressed: () async {
        
          },
          child: Text(tr("get_started")),
        ),
      ],
    );
  }
}
