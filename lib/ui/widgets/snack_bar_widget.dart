import 'package:flutter/material.dart';

class SnackBarWidget {
  static void catchErr(
    BuildContext context,
    VoidCallback function,
  ) {
    try {
      function();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(e.toString()),
      ));
    }
  }
}
