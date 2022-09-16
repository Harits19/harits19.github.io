import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:harits_portofolio/ui/base/constans/k_duration.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_locale.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/widgets/animated_slide_widget.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class HeaderView extends StatefulWidget {
  const HeaderView({
    Key? key,
    required this.onTapHeader,
  }) : super(key: key);

  final ValueChanged<int> onTapHeader;

  @override
  State<HeaderView> createState() => _HeaderViewState();
}

class _HeaderViewState extends State<HeaderView> {
  final _showHeader = KText.listHeader.map((e) => false).toList();

  @override
  Widget build(BuildContext context) {
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
                widget.onTapHeader(0);
              },
              child: const CircleAvatar(
                backgroundImage: AssetImage(KAsset.profile),
              ),
            ),
            const Gap.h(KSize.s24),
            ...() {
              final listHeader = KText.listHeader;
              return List.generate(
                listHeader.length,
                (e) {
                  final index = e + 1;
                  final header = Padding(
                    padding: const EdgeInsets.all(8),
                    child: BlocSelector<HomeCubit, HomeState, bool>(
                      selector: (state) {
                        return state.currentIndexView == index;
                      },
                      builder: (context, isActive) {
                        return AnimatedDefaultTextStyle(
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: isActive ? FontWeight.bold : null,
                            color: isActive ? Colors.blue : Colors.black,
                          ),
                          duration: KDuration.d100,
                          child: Text(
                            listHeader[e],
                          ),
                        );
                      },
                    ),
                  );
                  return InkWell(
                    onTap: () {
                      widget.onTapHeader(index);
                    },
                    child: _showHeader[e]
                        ? AnimatedSlideWidget(
                            onHalfEnd: () {
                              if (index == listHeader.length) {
                                return;
                              }
                              _showHeader[index] = true;
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
            }()
          ],
        ),
      ),
    );
  }
}
