import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function GiscusComments() {
  const giscusRef = useRef<HTMLDivElement>(null);

  const locale = usePathname().split("/")[1] || "en";
  const slug = usePathname().split("/")[3] || "";

  useEffect(() => {
    if (!giscusRef.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", "aaleccoder/giscus-portfolio");
    script.setAttribute("data-repo-id", "R_kgDOPTtB7A");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOPTtB7M4CteKV");
    script.setAttribute("data-mapping", slug);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "catppuccin_frappe");
    script.setAttribute("data-lang", locale);

    giscusRef.current.innerHTML = "";
    giscusRef.current.appendChild(script);
  }, []);

  return <div ref={giscusRef} />;
}
