import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class ContactView extends StatelessWidget {
  const ContactView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: tr('contact'),
      children: [
        ElevatedButton(
          onPressed: () => UrlUtil.launchUrlEmail(context),
          child: Text(
            tr('contact_me'),
            style: KTextStyle.subtitle,
          ),
        )
      ],
    );
  }
}
