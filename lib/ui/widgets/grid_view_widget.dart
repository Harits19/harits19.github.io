import 'package:flutter/material.dart';

class GridViewWidget<T> extends StatelessWidget {
  const GridViewWidget({
    super.key,
    this.list = const [],
    required this.crossAxisCount,
    required this.renderItem,
  });

  final List<T> list;
  final int crossAxisCount;

  final Widget Function(T item) renderItem;

  @override
  Widget build(BuildContext context) {
    final chunks = <Widget>[];

    final len = list.length;

    for (var i = 0; i < len; i += crossAxisCount) {
      var end = (i + crossAxisCount < len) ? i + crossAxisCount : len;
      final row = Row(
        children: [
          ...list.sublist(i, end).map(
                (e) => Expanded(child: renderItem(e)),
              ),
        ],
      );
      chunks.add(row);
    }
    return Column(
      children: chunks,
    );
  }
}
