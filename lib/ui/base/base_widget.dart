import 'package:flutter/material.dart';

Widget paddingV(double size) => SizedBox(
      height: size,
    );
Widget paddingH(double size) => SizedBox(
      width: size,
    );

void showError(
  BuildContext context,
  String error,
) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    content: Text(error),
  ));
}

Widget sideContainer({required List<Widget> children, bool reverse = false}) =>
    Expanded(
      flex: 1,
      child: Column(
        verticalDirection:
            reverse ? VerticalDirection.up : VerticalDirection.down,
        children: [
          paddingV(40),
          ...children.map((e) => e),
          paddingV(24),
          const Expanded(
              child: VerticalDivider(
            thickness: 4,
          ))
        ],
      ),
    );

Widget title(String text) => Text(
      text,
      style: const TextStyle(
        fontSize: 32,
        fontWeight: FontWeight.bold,
      ),
    );

Widget subtitle(String text) => Text(
      text,
      style: const TextStyle(
        fontSize: 16,
      ),
    );
