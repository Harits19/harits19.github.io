import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:harits_portofolio/ui/base/constans/k_text.dart';
import 'package:harits_portofolio/ui/base/constans/k_theme.dart';
import 'package:harits_portofolio/ui/base/providers/app/app_notifier.dart';
import 'package:harits_portofolio/ui/base/providers/language/language_service.dart';
import 'package:harits_portofolio/ui/home/home_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await LanguageService.init();

  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({Key? key}) : super(key: key);

  // TODO update translation file

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, ref) {
    // Test CI CD 1
    return MaterialApp(
      title: KText.abdullahHarits,
      debugShowCheckedModeBanner: false,
      themeMode: ref.watch(appProvider).themeMode,
      darkTheme: ThemeData.dark().copyWith(
        elevatedButtonTheme: KTheme.elevatedButtonTheme,
        outlinedButtonTheme: KTheme.outlinedButtonTheme,
      ),
      theme: ThemeData(
        elevatedButtonTheme: KTheme.elevatedButtonTheme,
        outlinedButtonTheme: KTheme.outlinedButtonTheme,
      ),
      home: const HomePage(),
    );
  }
}
