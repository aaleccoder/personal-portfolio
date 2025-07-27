
"use client";
import { useEffect, useState } from "react";

import { Sparkle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";


export default function Loading() {
  const t = useTranslations("Loading");
  const [timeout, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutReached(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen w-full py-20 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sparkle
          className="animate-spin-slow"
          size={32}
          style={{ color: "var(--primary)" }}
        />
        <span
          className="text-4xl font-titles font-black text-center"
          style={{ color: "var(--primary)" }}
        >
          {t("brand")}
        </span>
        <Loader2
          className="animate-spin"
          size={24}
          style={{ color: "var(--primary)" }}
        />
      </div>
      <span
        style={{ color: "var(--muted-foreground)" }}
        className="animate-[pulse_1.5s_ease-in-out_infinite]"
      >
        {t("message")}
      </span>
      {timeout && (
        <div className="flex flex-col items-center mt-6">
          <span className="text-lg text-center mb-2" style={{ color: "var(--destructive-foreground)" }}>
            Something went wrong. You can reload the page.
          </span>
          <button
            className="px-4 py-2 rounded bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/80 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}
    </div>
  )
};