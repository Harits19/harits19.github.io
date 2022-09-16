import 'package:easy_localization/easy_localization.dart';

enum Header {
  home('home'),
  about('about_me'),
  experience('experience'),
  work('work'),
  contact('contact');

  const Header(this._value);
  final String _value;

  @override
  String toString() {
    return _value.tr();
  }
}
