import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_enum.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class OnboardingView extends StatelessWidget {
  const OnboardingView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      children: [
        const Gap.v(KSize.s48),
        Text(
          tr('my_name_is'),
          style: KTextStyle.subtitle,
        ),
        const Text(
          KText.abdullahHarits,
          style: TextStyle(fontSize: 56, fontWeight: FontWeight.w900),
        ),
        Text(
          tr('i_full_stack_dev'),
          style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
        ),
        const Gap.v(8),
        Text(
          tr('onboarding_desc'),
          style: KTextStyle.subtitle,
        ),
        const Gap.v(24),
        OutlinedButton(
          onPressed: () async {
            final homeRead = context.read<HomeCubit>();
            homeRead.currentIndexView = Header.about.index;
          },
          child: Text(tr("get_started")),
        ),
      ],
    );
  }
}
