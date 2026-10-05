"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The pixel snippet in the root layout only fires PageView on the first
 * load. Next.js changes pages without reloading, so this fires PageView on
 * every client-side navigation after that.
 */
export default function MetaPixelPageView() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
