"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

export function LangToggle({ scrolled }: { scrolled?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const next = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      data-cursor="pointer"
      onClick={() => router.replace(pathname, { locale: next })}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-500 ${
        scrolled
          ? "border-gray-300 text-gray-600 hover:border-gray-500 hover:text-black"
          : "border-white/40 text-white/90 hover:border-white/60 hover:text-white"
      }`}
      aria-label={`Switch language to ${next}`}
    >
      <span className={`transition-colors duration-500 ${scrolled ? (locale === "en" ? "text-black" : "text-gray-400") : (locale === "en" ? "text-white" : "text-white/60")}`}>EN</span>
      <span className={`mx-1.5 transition-colors duration-500 ${scrolled ? "text-gray-300" : "text-white/40"}`}>/</span>
      <span className={`transition-colors duration-500 ${scrolled ? (locale === "ar" ? "text-black" : "text-gray-400") : (locale === "ar" ? "text-white" : "text-white/60")}`}>عربي</span>
    </button>
  );
}