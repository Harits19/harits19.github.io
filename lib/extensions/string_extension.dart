import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_notifier.dart';

extension StringExtension on String {
  String tr(WidgetRef ref) {
    return defaultTr(this, ref);
  }
}
