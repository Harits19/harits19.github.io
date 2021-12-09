import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/base_constanta.dart';
import 'package:harits_portofolio/ui/base/base_widget.dart';
import 'package:url_launcher/url_launcher.dart';

String? encodeQueryParameters(Map<String, String> params) {
  return params.entries
      .map((e) =>
          '${Uri.encodeComponent(e.key)}=${Uri.encodeComponent(e.value)}')
      .join('&');
}

launchUrl(BuildContext context, String url) async {
  if (!await launch(url)) {
    showError(context, "Cant Launch URL");
    return;
  }
}

launchUrlEmail(
  BuildContext context,
) {
  Uri emailLaunchUri = Uri(
    scheme: 'mailto',
    path: email,
  );
  launchUrl(context, emailLaunchUri.toString());
}
