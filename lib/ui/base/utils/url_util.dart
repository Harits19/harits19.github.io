import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/utils/widget_util.dart';
import 'package:url_launcher/url_launcher.dart';

class UrlUtil {
  static String? encodeQueryParameters(Map<String, String> params) {
    return params.entries
        .map((e) =>
            '${Uri.encodeComponent(e.key)}=${Uri.encodeComponent(e.value)}')
        .join('&');
  }

  static launchUrl(BuildContext context, String url) async {
    try {
      await launch(url);
    } catch (e) {
      WidgetUtil.showError(context, e);
    }
  }

  static Future<void> launchUrlEmail(BuildContext context) async {
    Uri emailLaunchUri = Uri(
      scheme: 'mailto',
      path: KText.email,
    );
    await launchUrl(context, emailLaunchUri.toString());
  }
}
