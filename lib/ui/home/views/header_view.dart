import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_enum.dart';
import 'package:harits_portofolio/ui/base/constans/k_locale.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/cubits/app/app_cubit.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/home/views/menu_view.dart';
import 'package:harits_portofolio/ui/widgets/animated_slide_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';
import 'package:harits_portofolio/ui/utils/responsive_util.dart';

class HeaderView extends StatefulWidget {
  const HeaderView({
    Key? key,
  }) : super(key: key);

  @override
  State<HeaderView> createState() => _HeaderViewState();
}

class _HeaderViewState extends State<HeaderView> {
  @override
  Widget build(BuildContext context) {
    final homeRead = context.read<HomeCubit>();

    return AnimatedSlideWidget(
      onHalfEnd: () {
        // start animation
        // _showHeader[0] = true;
        // setState(() {});
      },
      child: Container(
        padding: const EdgeInsets.all(KSize.s16),
        child: Row(
          children: [
            InkWell(
              onTap: () {
                homeRead.currentIndexView = (Header.home.index);
              },
              child: const CircleAvatar(
                backgroundImage: AssetImage(KAsset.profile),
              ),
            ),
            const Gap.h(KSize.s24),
            if (ResponsiveUtil.isDesktop(context)) const MenuView(),
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
            BlocSelector<AppCubit, AppState, ThemeMode>(
              selector: (state) {
                return state.themeMode;
              },
              builder: (context, themeMode) {
                return IconButton(
                  onPressed: context.read<AppCubit>().toggleTheme,
                  icon: Icon(
                    () {
                      if (themeMode == ThemeMode.dark) {
                        return Icons.light_mode;
                      }
                      if (themeMode == ThemeMode.light) {
                        return Icons.dark_mode;
                      }
                    }(),
                  ),
                );
              },
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
