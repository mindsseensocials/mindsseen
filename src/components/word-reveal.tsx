type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  from?: "up" | "down";
};

export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  from = "up",
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom"
        >
          <span
            className={`word-reveal word-${from}`}
            style={{ animationDelay: `${delay + index * stagger}s` }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
