"use client";

import { Locale } from "@/lib/i18n";
import { createContext, ReactNode, useContext, useState } from "react";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: Locale;
}) {
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export default function useLocale() {
  const locale = useContext(LocaleContext);

  return { locale };
}
