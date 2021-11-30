import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';

class AboutMeView extends StatelessWidget {
  const AboutMeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: NeverScrollableScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          paddingV(40),
          title(
            "About Me",
          ),
          paddingV(16),
          IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: subtitle(
                      "Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS! Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients. I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React. Here are a few technologies I’ve been working with recently:"),
                ),
                paddingH(8),
                Expanded(
                  child: Container(
                    color: Colors.yellow,
                    child: Center(child: Text("Image")),
                  ),
                )
              ],
            ),
          ),
          paddingV(16),
          subtitle(
              "Here are a few technologies I’ve been working with recently:"),
          paddingV(8),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            childAspectRatio: 16 / 1,
            children: [
              ...listOfSkill.map((e) => Row(
                    children: [
                      paddingH(8),
                      const Icon(
                        Icons.circle,
                        size: 8,
                      ),
                      paddingH(8),
                      subtitle(e),
                    ],
                  )),
            ],
          ),
          paddingV(40),
        ],
      ),
    );
  }
}
