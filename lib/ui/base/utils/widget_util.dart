import 'package:flutter/material.dart';

class WidgetUtil {
  WidgetUtil._();

  static void showError(
    BuildContext context,
    dynamic error,
  ) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(error.toString()),
    ));
  }
}
