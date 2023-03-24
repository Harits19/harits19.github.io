import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/providers/app/app_notifier.dart';
import 'package:harits_portofolio/ui/base/providers/home/home_notifier.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_notifier.dart';
import 'package:harits_portofolio/ui/home/home_page.dart';
import 'package:harits_portofolio/ui/home/views/menu_view.dart';
import 'package:harits_portofolio/ui/widgets/animated_slide_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap_widget.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HeaderView extends ConsumerStatefulWidget {
  const HeaderView({
    Key? key,
    this.menus = const [],
    required this.onTapMenu,
  }) : super(key: key);

  final List<Menus> menus;
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
            const GapWidget.h(KSize.s24),
            if (ResponsiveUtil.isDesktop(context))
              MenuView(
                menus: widget.menus,
                onTapMenu: widget.onTapMenu,
              ),
            const Spacer(),
            () {
              final currentLocale = ref.watch(languageProvider);

              return IconButton(
                icon: Text(
                  currentLocale.languageEnum.name.toUpperCase(),
                  style: const TextStyle(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                onPressed: () {
                  ref.read(languageProvider.notifier).toggleLanguage();
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
