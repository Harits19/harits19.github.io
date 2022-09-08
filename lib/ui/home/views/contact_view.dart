import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_textstyle.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class ContactView extends StatelessWidget {
  const ContactView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "Contact",
      children: [
        ElevatedButton(
          onPressed: () => UrlUtil.launchUrlEmail(context),
          child: const Text(
            "Contact Me",
            style: KTextStyle.subtitle,
          ),
        )
      ],
    );
  }
}
