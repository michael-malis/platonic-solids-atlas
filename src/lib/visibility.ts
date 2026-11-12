import { useEffect, useRef, useState } from "react";

export function useSceneVisibility() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); preload.disconnect(); }
    }, { rootMargin: "400px" });
    const viewport = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preload.observe(element);
    viewport.observe(element);
    return () => { preload.disconnect(); viewport.disconnect(); };
  }, []);
  return { ref, ready, visible };
}

export function useDocumentVisible() {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  return visible;
}

export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}
