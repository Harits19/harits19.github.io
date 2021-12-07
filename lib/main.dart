import 'package:flutter/material.dart';
import 'package:harits_portofolio/ui/home/home_page.dart';
import 'package:responsive_framework/responsive_framework.dart';

void main() {
  // LicenseRegistry.addLicense(() async* {
  //   final license = await rootBundle.loadString('google_fonts/OFL.txt');
  //   yield LicenseEntryWithLineBreaks(['google_fonts'], license);
  // });
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        // textTheme: GoogleFonts.latoTextTheme(
        //   Theme.of(context).textTheme,
        // ),
        // brightness: Brightness.dark,
        // canvasColor: Colors.black,
        colorScheme: const ColorScheme.light(secondary: Colors.black),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: ButtonStyle(
            // backgroundColor: MaterialStateProperty.all<Color>(Colors.green),
            // shadowColor: MaterialStateProperty.all<Color>(Colors.green),
            foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
            overlayColor:
                MaterialStateProperty.all<Color>(Colors.black.withOpacity(0.2)),
          ),
        ),
      ),

      // home: const HomePage(),
      home: ResponsiveWrapper.builder(const HomePage(),
          maxWidth: 1200,
          minWidth: 480,
          defaultScale: true,
          breakpoints: [
            const ResponsiveBreakpoint.resize(480, name: MOBILE),
            const ResponsiveBreakpoint.autoScale(800, name: TABLET),
            const ResponsiveBreakpoint.resize(1000, name: DESKTOP),
          ],
          background: Container(color: const Color(0xFFF5F5F5))),
    );
  }
}
