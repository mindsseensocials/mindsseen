const EXIT_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const EXIT_MS = 550;

function snapshot(el: Element, props: string[]) {
  const style = getComputedStyle(el);
  return Object.fromEntries(
    props.map((prop) => [prop, style.getPropertyValue(prop)]),
  ) as Keyframe;
}

function play(el: HTMLElement, props: string[], to: Keyframe, duration = EXIT_MS) {
  const from = snapshot(el, props);
  for (const prop of props) {
    el.style.setProperty(prop, String(from[prop] ?? ""));
  }
  el.getAnimations().forEach((animation) => animation.cancel());
  const animation = el.animate([from, to], {
    duration,
    easing: EXIT_EASE,
    fill: "forwards",
  });
  animation.finished.finally(() => {
    for (const prop of props) {
      el.style.removeProperty(prop);
    }
  }).catch(() => undefined);
  return animation;
}

export async function playSectionExit(panel: HTMLElement) {
  const running: Animation[] = [];

  panel.querySelectorAll<HTMLElement>(".word-up").forEach((el) => {
    running.push(
      play(el, ["opacity", "transform"], {
        opacity: "0",
        transform: "translateY(110%)",
      }),
    );
  });

  panel.querySelectorAll<HTMLElement>(".word-down, .eyebrow-reveal").forEach((el) => {
    running.push(
      play(el, ["opacity", "transform"], {
        opacity: "0",
        transform: "translateY(-110%)",
      }),
    );
  });

  panel.querySelectorAll<HTMLElement>(".animate-fade-up, .whim-mask").forEach((el) => {
    running.push(
      play(el, ["opacity", "transform"], {
        opacity: "0",
        transform: "translateY(20px)",
      }),
    );
  });

  panel.querySelectorAll<HTMLElement>(".hero-mask, .platform-stage").forEach((el) => {
    running.push(
      play(el, ["clip-path"], { clipPath: "inset(50%)" }, 700),
    );
  });

  panel.querySelectorAll<HTMLElement>(".card-up").forEach((el) => {
    running.push(
      play(el, ["opacity", "transform"], {
        opacity: "0",
        transform: "translateY(56px)",
      }),
    );
  });

  panel.querySelectorAll<HTMLElement>(".card-down").forEach((el) => {
    running.push(
      play(el, ["opacity", "transform"], {
        opacity: "0",
        transform: "translateY(-56px)",
      }),
    );
  });

  panel.querySelectorAll<HTMLElement>(".circle-reveal").forEach((el) => {
    running.push(
      play(el, ["opacity", "filter"], {
        opacity: "0",
        filter: "blur(16px)",
      }),
    );
  });

  panel.querySelectorAll<HTMLElement>("[data-paint-frame]").forEach((el) => {
    running.push(play(el, ["width"], { width: "0px" }, 500));
  });

  if (running.length === 0) return;

  await Promise.race([
    Promise.all(running.map((animation) => animation.finished.catch(() => undefined))),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 900);
    }),
  ]);
}
