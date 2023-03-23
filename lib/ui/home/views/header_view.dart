import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:harits_portofolio/models/menu_model.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_locale.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/providers/app/app_notifier.dart';
import 'package:harits_portofolio/ui/base/providers/home/home_notifier.dart';
import 'package:harits_portofolio/ui/home/home_page.dart';
import 'package:harits_portofolio/ui/home/views/menu_view.dart';
import 'package:harits_portofolio/ui/widgets/animated_slide_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HeaderView extends ConsumerStatefulWidget {
  const HeaderView({
    Key? key,
    this.menus = const [],
    required this.onTapMenu,
  }) : super(key: key);

  final List<MenuModel> menus;
  final ValueChanged<int> onTapMenu;

  @override
  ConsumerState<HeaderView> createState() => _HeaderViewState();
}

class _HeaderViewState extends ConsumerState<HeaderView> {
  @override
  Widget build(BuildContext context) {
    return AnimatedSlideWidget(
      onHalfEnd: () {},
      child: Container(
        padding: const EdgeInsets.all(KSize.s16),
        child: Row(
          children: [
            InkWell(
              onTap: () {
                ref.read(homeProvider.notifier).scroll(Menus.home.index);
              },
              child: const CircleAvatar(
                backgroundImage: AssetImage(KAsset.profile),
              ),
            ),
            const Gap.h(KSize.s24),
            if (ResponsiveUtil.isDesktop(context))
              MenuView(
                menus: widget.menus,
                onTapMenu: widget.onTapMenu,
              ),
            const Spacer(),
            () {
              final currentLocale = EasyLocalization.of(context)?.currentLocale;
              var localeText = KLocale.id.languageCode.toUpperCase();
              var updateLocaleTo = KLocale.id;
              if (currentLocale == KLocale.id) {
                updateLocaleTo = KLocale.en;
                localeText = KLocale.en.languageCode.toUpperCase();
              }

              return IconButton(
                icon: Text(
                  localeText,
                  style: const TextStyle(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                onPressed: () {
                  EasyLocalization.of(context)?.setLocale(updateLocaleTo);
                },
              );
            }(),
            IconButton(
              onPressed: ref.read(appProvider.notifier).toggleTheme,
              icon: Icon(
                () {
                  final themeMode = ref.watch(appProvider).themeMode;
                  if (themeMode == ThemeMode.dark) {
                    return Icons.light_mode;
                  }
                  if (themeMode == ThemeMode.light) {
                    return Icons.dark_mode;
                  }
                }(),
              ),
            ),
            if (ResponsiveUtil.isMobile(context))
              IconButton(
                  onPressed: () {
                    Scaffold.of(context).openEndDrawer();
                  },
                  icon: const Icon(Icons.menu))
          ],
        ),
      ),
    );
  }
}
