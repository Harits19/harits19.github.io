import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_notifier.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class ContactView extends ConsumerWidget {
  const ContactView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, ref) {
    return SectionContainer(
      titleText: tr('contact', ref),
      children: [
        ElevatedButton(
          onPressed: () => UrlUtil.launchUrlEmail(context),
          child: Text(
            tr('contact_me', ref),
            style: KTextStyle.subtitle,
          ),
        )
      ],
    );
  }
}
