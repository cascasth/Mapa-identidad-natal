"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = "1389833309683131";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export function trackEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const lastPathname = useRef("");

  useEffect(() => {
    // La primera carga ya dispara PageView desde el <head> — solo rastrear navegaciones internas
    if (isFirst.current) { isFirst.current = false; lastPathname.current = pathname; return; }
    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;
    trackEvent("PageView");
  }, [pathname]);

  return null;
}
