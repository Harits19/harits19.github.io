
extension IntExtension on int {
  Duration get toMilliseconds {
    return Duration(milliseconds: this);
  }
}