import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';
import 'package:harits_portofolio/ui/base/constans/k_enum.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/cubits/app/app_cubit.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/widgets/responsive_widget.dart';

class MenuView extends StatelessWidget {
  const MenuView({
    super.key,
    this.onTapMenu,
  });

  final VoidCallback? onTapMenu;

  @override
  Widget build(BuildContext context) {
    final homeRead = context.read<HomeCubit>();

    return Wrap(
      direction:
          ResponsiveWidget.isMobile(context) ? Axis.vertical : Axis.horizontal,
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      runAlignment: WrapAlignment.center,
      spacing: KSize.s16,
      children: [
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
                  if (onTapMenu == null) return;
                  onTapMenu!();
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
