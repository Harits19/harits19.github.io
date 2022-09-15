enum KAsset {
  profile("$_path/profile.jpg"),
  protect("$_path/protect.webp"),
  ayoLunas("$_path/ayolunas.png"),
  soundfren("$_path/soundfren.webp"),
  pejuang("$_path/pejuang.webp"),
  batumbu("$_path/batumbu.png"),
  tuntun("$_path/tuntun.png"),
  primasaver("$_path/primasaver.png"),
  imaniPrima('$_path/imani_prima.png'),
  skyshi('$_path/skyshi.png'),
  smarfren('$_path/smartfren.png');

  static const _path = 'assets';

  const KAsset(this.value);
  final String value;
}
