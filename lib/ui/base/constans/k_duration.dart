class KDuration {
  KDuration._();

  static final d300 = 300.toMilliseconds,
      d100 = 100.toMilliseconds,
      d500 = 500.toMilliseconds,
      d2000 = 2000.toMilliseconds,
      d0 = 0.toMilliseconds,
      d600 = 600.toMilliseconds;
}

extension on int {
  Duration get toMilliseconds {
    return Duration(milliseconds: this);
  }
}
