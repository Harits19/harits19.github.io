import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:harits_portofolio/ui/base/constans/k_asset.dart';
import 'package:harits_portofolio/ui/base/constans/k_size.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/base/utils/url_util.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/widgets/gap.dart';

class HeaderView extends StatelessWidget {
  const HeaderView({
    Key? key,
    required this.onTapHeader,
  }) : super(key: key);

  final ValueChanged<int> onTapHeader;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(KSize.s16),
      child: Row(
        children: [
          const CircleAvatar(
            backgroundImage: AssetImage(KAsset.profile),
          ),
          const Spacer(),
          ...() {
            final listHeader = KText.listHeader;
            return List.generate(
              listHeader.length,
              (index) {
                return InkWell(
                  onTap: () {
                    onTapHeader(index);
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: BlocSelector<HomeCubit, HomeState, bool>(
                      selector: (state) {
                        return state.currentIndexView == index;
                      },
                      builder: (context, isActive) {
                        return Text(
                          listHeader[index],
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: isActive ? FontWeight.bold : null,
                            color: isActive ? Colors.blue : null,
                          ),
                        );
                      },
                    ),
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
          const Gap.h(8)
        ],
      ),
    );
  }
}
