import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/models/menu_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/providers/app/app_notifier.dart';
import 'package:harits_portofolio/ui/utils/url_util.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';

class MenuView extends ConsumerWidget {
  const MenuView({
    super.key,
    required this.onTapMenu,
    required this.menus,
    required this.activeMenuIndex,
  });

  final ValueChanged<int> onTapMenu;
  final List<MenuModel> menus;
  final int activeMenuIndex;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final app = ref.watch(appProvider);

    return Wrap(
      direction:
          ResponsiveUtil.isMobile(context) ? Axis.vertical : Axis.horizontal,
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      runAlignment: WrapAlignment.center,
      spacing: KSize.s16,
      children: [
        ...() {
          final listHeader = menus.map((e) => e.text).toList();
          return List.generate(
            listHeader.length,
            (index) {
              final isActive = activeMenuIndex == index;
              final headerText = listHeader[index].toString();
              if (headerText.isEmpty) return const SizedBox();
              final header = Padding(
                padding: const EdgeInsets.all(8),
                child: AnimatedDefaultTextStyle(
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: isActive ? FontWeight.bold : null,
                    color: () {
                      if (isActive) {
                        return Colors.blue;
                      }
                      if (app.themeMode == ThemeMode.dark) {
                        return Colors.white;
                      }
                      return Colors.black;
                    }(),
                  ),
                  duration: KDuration.d100,
                  child: Text(
                    headerText,
                  ),
                ),
              );
              return InkWell(
                onTap: () {
                  onTapMenu(index);
                },
                child: header,
              );
            },
          );
        }(),
        OutlinedButton(
          child: Text(tr('resume')),
          onPressed: () {
            UrlUtil.launchUrl(context, KText.resume);
            UrlUtil.launchUrl(context, KText.resumeDownload);
          },
        ),
      ],
    );
  }
}
