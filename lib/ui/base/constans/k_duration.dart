enum KDuration {
  d300(300),
  d100(100),
  d500(500),
  d2000(2000),
  d0(0);

  const KDuration(this._milliseconds);
  final int _milliseconds;

  Duration get value {
    return Duration(milliseconds: _milliseconds);
  }
}
