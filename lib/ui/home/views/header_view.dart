import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_function.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:harits_portofolio/ui/home/views/about_me_view.dart';

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
        ...listHeader.map(
          (e) => InkWell(
            onTap: () {
              onTapHeader(listHeader.indexOf(e));
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
        paddingH(8),
        OutlinedButton(
          child: const Text("Resume"),
          onPressed: () {
            launchUrl(context,
                "https://docs.google.com/document/d/1sG-A9ulHr12cY02n_0s_DS6hUrgpGsopaEGPfsZP0uo/edit?usp=sharing");
          },
        ),
        paddingH(8)
      ],
    );
  }
}
