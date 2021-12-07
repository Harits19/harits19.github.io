import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/section_container.dart';

class ContactView extends StatelessWidget {
  const ContactView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SectionContainer(
      titleText: "Contact",
      children: [
        ElevatedButton(
          onPressed: () => launchUrlEmail(context),
          child: subtitle("Contact Me"),
        )
      ],
    );
  }
}
