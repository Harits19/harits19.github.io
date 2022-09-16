import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_enum.dart';
import 'package:harits_portofolio/ui/base/constans/k_locale.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/cubits/app/app_cubit.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/widgets/animated_slide_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class HeaderView extends StatefulWidget {
  const HeaderView({
    Key? key,
  }) : super(key: key);

  @override
  State<HeaderView> createState() => _HeaderViewState();
}

class _HeaderViewState extends State<HeaderView> {
  final _showHeader = Header.values.map((e) => false).toList();

  @override
  Widget build(BuildContext context) {
    final homeRead = context.read<HomeCubit>();
    return AnimatedSlideWidget(
      onHalfEnd: () {
        // start animation
        _showHeader[0] = true;
        setState(() {});
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
            ...() {
              const listHeader = Header.values;
              return List.generate(
                listHeader.length,
                (index) {
                  final header = Padding(
                    padding: const EdgeInsets.all(8),
                    child: BlocSelector<HomeCubit, HomeState, bool>(
                      selector: (state) {
                        return state.currentIndexView == index;
                      },
                      builder: (context, isActive) {
                        return BlocBuilder<AppCubit, AppState>(
                          builder: (context, state) {
                            return AnimatedDefaultTextStyle(
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: isActive ? FontWeight.bold : null,
                                color: () {
                                  if (isActive) {
                                    return Colors.blue;
                                  }
                                  if (state.themeMode == ThemeMode.dark) {
                                    return Colors.white;
                                  }
                                  return Colors.black;
                                }(),
                              ),
                              duration: KDuration.d100,
                              child: Text(
                                listHeader[index].toString(),
                              ),
                            );
                          },
                        );
                      },
                    ),
                  );
                  return InkWell(
                    onTap: () {
                      homeRead.currentIndexView = index;
                    },
                    child: _showHeader[index]
                        ? AnimatedSlideWidget(
                            onHalfEnd: () {
                              final newIndex = index + 1;
                              if (newIndex == listHeader.length) {
                                return;
                              }
                              _showHeader[newIndex] = true;
                              setState(() {});
                            },
                            child: header,
                          )
                        : Opacity(
                            opacity: 0,
                            child: header,
                          ),
                  );
                },
              );
            }(),
            const Gap.h(8),
            OutlinedButton(
              child: Text(tr('resume')),
              onPressed: () {
                UrlUtil.launchUrl(context, KText.resume);
              },
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
            )
          ],
        ),
      ),
    );
  }
}
