"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

export function LocaleAttributes() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar-SA" : "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
