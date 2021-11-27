import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Spacer(),
                ...["About", "Experience", "Work", "Contact"].map(
                  (e) => InkWell(
                    onTap: () {},
                    child: Padding(
                      padding: const EdgeInsets.all(10),
                      child: Text(
                        e,
                        style: const TextStyle(fontSize: 16),
                      ),
                    ),
                  ),
                ),
                paddingH(10),
                OutlinedButton(
                  onPressed: () {},
                  child: const Text("Resume"),
                ),
                paddingH(10)
              ],
            ),
            const Divider(
              height: 0,
            ),
            Expanded(
              child: Row(
                children: [
                  sideContainer(
                    reverse: true,
                    children: [
                      const Text(
                        "Powered by Flutter Web",
                        style: TextStyle(fontSize: 8),
                      ),
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(FontAwesome5.linkedin),
                      ),
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(FontAwesome5.instagram),
                      ),
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(FontAwesome5.github),
                      ),
                    ],
                  ),
                  Expanded(
                    flex: 3,
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.all(5),
                      physics: const BouncingScrollPhysics(),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          paddingV(50),
                          const Text(
                            "Hi, my name is",
                            style: TextStyle(fontSize: 16),
                          ),
                          const Text(
                            "Abdullah Harits",
                            style: TextStyle(
                                fontSize: 56, fontWeight: FontWeight.w900),
                          ),
                          const Text(
                            "I build mobile application",
                            style: TextStyle(
                                fontSize: 48, fontWeight: FontWeight.bold),
                          ),
                          paddingV(10),
                          const Text(
                            "I’m a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products at Upstatement.",
                            style: TextStyle(fontSize: 16),
                          ),
                          paddingV(20),
                          OutlinedButton(
                            onPressed: () {},
                            child: const Text("Get Started"),
                          ),
                          paddingV(1000),
                        ],
                      ),
                    ),
                  ),
                  sideContainer(children: [
                    const RotatedBox(
                      quarterTurns: 1,
                      child: Text("harits.abdullah19@gmail.com"),
                    ),
                  ]),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget sideContainer(
          {required List<Widget> children, bool reverse = false}) =>
      Expanded(
        flex: 1,
        child: Column(
          verticalDirection:
              reverse ? VerticalDirection.up : VerticalDirection.down,
          children: [
            paddingV(40),
            ...children.map((e) => e),
            paddingV(20),
            const Expanded(
                child: VerticalDivider(
              thickness: 4,
            ))
          ],
        ),
      );
}
