// ignore_for_file: prefer_const_constructors

import 'package:easy_localization/easy_localization.dart';
import 'package:easy_localization_loader/easy_localization_loader.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/ui/base/constans/k_locale.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/constans/k_theme.dart';
import 'package:harits_portofolio/ui/base/cubits/app/app_cubit.dart';
import 'package:harits_portofolio/ui/base/cubits/home/home_cubit.dart';
import 'package:harits_portofolio/ui/home/home_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();
  // deploy 1

  runApp(
    EasyLocalization(
      supportedLocales: KLocale.supportedLocales,
      fallbackLocale: KLocale.en,
      path: KLocale.translationPath,
      assetLoader: YamlAssetLoader(),
      startLocale: KLocale.en,
      useOnlyLangCode: true,
      child: ProviderScope(
        child: const MyApp(),
      ),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({Key? key}) : super(key: key);

  // TODO make easylocalization with flutter_bloc
  // TODO make page responsive to mobile
  // TODO update translation file
  // TODO fix issue traslation

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, ref) {
    // Test CI CD 1
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => HomeCubit()),
      ],
      child: MaterialApp(
        title: KText.abdullahHarits,
        debugShowCheckedModeBanner: false,
        localizationsDelegates: context.localizationDelegates,
        supportedLocales: context.supportedLocales,
        locale: context.locale,
        themeMode: ref.watch(appProvider).themeMode,
        darkTheme: ThemeData.dark().copyWith(
          elevatedButtonTheme: KTheme.elevatedButtonTheme,
          outlinedButtonTheme: KTheme.outlinedButtonTheme,
        ),
        theme: ThemeData(
          elevatedButtonTheme: KTheme.elevatedButtonTheme,
          outlinedButtonTheme: KTheme.outlinedButtonTheme,
        ),
        home: HomePage(),
      ),
    );
  }
}
