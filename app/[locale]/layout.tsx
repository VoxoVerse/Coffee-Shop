import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/ui/CustomCursor";
import { LocaleAttributes } from "@/components/LocaleAttributes";
import { LenisRoot } from "@/components/LenisRoot";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!routing.locales.includes(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        ar: "/ar",
        "ar-SA": "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
      url: "https://mylifecoffee.sa",
      siteName: "My Life Coffee",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isAr = locale === "ar";

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleAttributes />
      <LenisRoot />
      <CustomCursor />
      <WhatsAppFloatingButton />
      <div className={isAr ? "font-arabic" : undefined}>{children}</div>
    </NextIntlClientProvider>
  );
}
