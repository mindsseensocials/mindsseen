"use client";

import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ENTER_LOCK_MS,
  SECTIONS,
  type SectionPhase,
  type SectionTheme,
} from "@/lib/sections";
import { playSectionExit } from "@/lib/play-section-exit";

type StoryValue = {
  index: number;
  theme: SectionTheme;
  phaseFor: (id: string) => SectionPhase;
  goTo: (index: number) => void;
};

const StoryContext = createContext<StoryValue | null>(null);

export function useStory() {
  const value = useContext(StoryContext);
  if (!value) {
    throw new Error("useStory must be used within Story");
  }
  return value;
}

export function useSectionPhase(id: string): SectionPhase {
  return useStory().phaseFor(id);
}


export function Story({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const panels = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [phases, setPhases] = useState<SectionPhase[]>(() =>
    SECTIONS.map((_, i) => (i === 0 ? "enter" : "hidden")),
  );
  const locked = useRef(true);
  const indexRef = useRef(0);
  const touchY = useRef<number | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback((nextIndex: number) => {
    const currentIndex = indexRef.current;
    if (locked.current) return;
    if (
      nextIndex < 0 ||
      nextIndex >= SECTIONS.length ||
      nextIndex === currentIndex
    ) {
      return;
    }

    locked.current = true;

    const run = async () => {
      const panel = panelRefs.current[currentIndex];
      if (panel) {
        await playSectionExit(panel);
      }

      setIndex(nextIndex);
      indexRef.current = nextIndex;
      setPhases(SECTIONS.map((_, i) => (i === nextIndex ? "enter" : "hidden")));
      panel?.getAnimations({ subtree: true }).forEach((animation) => {
        animation.cancel();
      });
      window.history.pushState(
        { index: nextIndex },
        "",
        `#${SECTIONS[nextIndex].id}`,
      );

      window.setTimeout(() => {
        locked.current = false;
      }, ENTER_LOCK_MS);
    };

    void run();
  }, []);

  const goBy = useCallback((delta: number) => {
    goTo(indexRef.current + delta);
  }, [goTo]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const hash = window.location.hash.slice(1);
    const match = SECTIONS.findIndex((section) => section.id === hash);
    if (match > 0) {
      setIndex(match);
      indexRef.current = match;
      setPhases(SECTIONS.map((_, i) => (i === match ? "enter" : "hidden")));
    } else {
      window.history.replaceState({ index: 0 }, "", `#${SECTIONS[0].id}`);
    }

    const unlock = window.setTimeout(() => {
      locked.current = false;
    }, ENTER_LOCK_MS);

    return () => {
      window.clearTimeout(unlock);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 6) return;
      goBy(event.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchY.current == null) return;
      const endY = event.changedTouches[0]?.clientY ?? touchY.current;
      const delta = touchY.current - endY;
      touchY.current = null;
      if (Math.abs(delta) < 40) return;
      goBy(delta > 0 ? 1 : -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goBy(1);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goBy(-1);
      }
    };

    const onPopState = () => {
      const hash = window.location.hash.slice(1);
      const next = SECTIONS.findIndex((section) => section.id === hash);
      if (next >= 0 && next !== indexRef.current) {
        locked.current = false;
        goTo(next);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [goBy, goTo]);

  const value = useMemo<StoryValue>(
    () => ({
      index,
      theme: SECTIONS[index].theme,
      phaseFor: (id) => {
        const i = SECTIONS.findIndex((section) => section.id === id);
        return phases[i] ?? "hidden";
      },
      goTo,
    }),
    [goTo, index, phases],
  );

  return (
    <StoryContext.Provider value={value}>
      {header}
      <main className="story-root relative h-svh overflow-hidden bg-[#F6F3ED]">
        {panels.map((panel, i) => (
          <section
            key={SECTIONS[i].id}
            id={SECTIONS[i].id}
            aria-label={SECTIONS[i].label}
            ref={(node) => {
              panelRefs.current[i] = node;
            }}
            data-phase={phases[i]}
            className="story-panel absolute inset-0"
            style={{
              visibility: phases[i] === "hidden" ? "hidden" : "visible",
              pointerEvents: phases[i] === "hidden" ? "none" : "auto",
              zIndex: phases[i] === "hidden" ? 0 : 2,
            }}
            aria-hidden={phases[i] === "hidden"}
          >
            {panel}
          </section>
        ))}
      </main>
    </StoryContext.Provider>
  );
}
