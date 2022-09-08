import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class HeaderView extends StatelessWidget {
  const HeaderView({
    Key? key,
    required this.onTapHeader,
  }) : super(key: key);

  final ValueChanged<int> onTapHeader;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Spacer(),
        ...KText.listHeader.map(
          (e) => InkWell(
            onTap: () {
              onTapHeader(KText.listHeader.indexOf(e));
            },
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Text(
                e,
                style: const TextStyle(fontSize: 16),
              ),
            ),
          ),
        ),
        const Gap.h(8),
        OutlinedButton(
          child: Text(tr('resume')),
          onPressed: () {
            UrlUtil.launchUrl(context, KText.resume);
          },
        ),
        const Gap.h(8)
      ],
    );
  }
}
