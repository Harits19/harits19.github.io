import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_profile.dart';

import 'package:harits_portofolio/ui/widgets/snack_bar_widget.dart';
import 'package:url_launcher/url_launcher.dart' as urlLauncher;

class UrlUtil {
  static String? encodeQueryParameters(Map<String, String> params) {
    return params.entries
        .map((e) =>
            '${Uri.encodeComponent(e.key)}=${Uri.encodeComponent(e.value)}')
        .join('&');
  }

  static Future<void> launchUrl(BuildContext context, String url) async {
    SnackBarWidget.catchErr(context, () async {
      await urlLauncher.launchUrl(Uri.parse(url));
    });
  }

  static Future<void> launchUrlEmail(BuildContext context) async {
    Uri emailLaunchUri = Uri(
      scheme: 'mailto',
      path: KProfile.email,
    );
    await launchUrl(context, emailLaunchUri.toString());
  }
}
