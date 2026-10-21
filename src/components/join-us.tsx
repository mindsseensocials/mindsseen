"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { PaintRule } from "@/components/paint-rule";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase, useStory } from "@/components/story";
import { joinWaitlist, type JoinWaitlistState } from "@/lib/join-waitlist";

const initialState: JoinWaitlistState = { status: "idle", message: "" };

function Field({
  id,
  name,
  type,
  autoComplete,
  label,
  value,
  onChange,
  disabled,
}: {
  id: string;
  name: string;
  type: "text" | "email";
  autoComplete: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1 block px-1 text-[12px] leading-none text-white/80 md:mb-1.5 md:text-[13px]"
      >
        {label}
      </label>
      <div className="rounded-full border border-white">
        <input
          id={id}
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent px-3.5 py-2.5 text-[13px] text-white outline-none disabled:opacity-60 md:px-6 md:py-3 md:text-[14px]"
        />
      </div>
    </div>
  );
}

export function JoinUs() {
  const phase = useSectionPhase("join-us");
  const { goTo } = useStory();
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [consent, setConsent] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-black px-5 pt-20 pb-5 text-white md:px-12 md:pt-24 md:pb-10 lg:px-20">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
        <div className="grid grid-cols-1 gap-4 md:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:items-start lg:gap-20 lg:pt-6">
          <div>
            <h2 className="text-[clamp(1.7rem,7.2vw,1.95rem)] leading-[1.1] tracking-[-0.03em] md:text-[clamp(2.25rem,4.6vw,3.85rem)] md:leading-[1.08]">
              <span className="block font-heading font-extralight">
                <WordReveal text="Different minds." delay={0.35} />
              </span>
              <span className="mt-1 block font-serif italic font-normal">
                <WordReveal text="More room to be." delay={0.59} />
              </span>
            </h2>

            <p className="animate-fade-up mt-4 max-w-[22rem] text-[14px] leading-6 text-white/80 [animation-delay:1.05s] md:mt-8 md:text-[15px] md:leading-7">
              However you arrive, there is room for your way of experiencing the
              world.
            </p>
          </div>

          <div className="lg:pt-3">
            <p className="font-heading text-[1.25rem] font-extralight leading-none md:text-[clamp(1.5rem,2.2vw,1.9rem)]">
              <WordReveal text="Join us." delay={0.5} />
            </p>

            {state.status === "success" ? (
              <p
                role="status"
                className="animate-fade-up mt-5 max-w-lg text-[14px] leading-6 text-white/80 md:text-[15px] md:leading-7"
              >
                {state.message}
              </p>
            ) : (
              <form
                action={formAction}
                className="animate-fade-up mt-4 flex w-full max-w-lg flex-col gap-2.5 [animation-delay:1.15s] md:mt-6 md:gap-3"
              >
                <Field
                  id="join-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  label="Full name"
                  value={name}
                  disabled={pending}
                  onChange={setName}
                />
                <Field
                  id="join-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Email address"
                  value={email}
                  disabled={pending}
                  onChange={setEmail}
                />
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <Field
                    id="join-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    label="Company"
                    value={company}
                    disabled={pending}
                    onChange={setCompany}
                  />
                  <Field
                    id="join-role"
                    name="role"
                    type="text"
                    autoComplete="organization-title"
                    label="Role"
                    value={role}
                    disabled={pending}
                    onChange={setRole}
                  />
                </div>

                <label
                  htmlFor="join-consent"
                  className="flex items-start gap-3 px-1 text-[12px] leading-5 text-white/80 md:text-[13px]"
                >
                  <input
                    id="join-consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    disabled={pending}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-0.5 size-4 shrink-0 accent-white"
                  />
                  <span>
                    I agree to receive information when Minds Seen is live.
                  </span>
                </label>

                {state.status === "error" ? (
                  <p
                    role="alert"
                    className="px-1 text-[12px] leading-5 text-white md:text-[13px]"
                  >
                    {state.message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={pending}
                  className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] leading-none text-neutral-950 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 sm:w-fit md:py-3.5"
                >
                  {pending ? "Joining…" : "Join the Waitlist"}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2.5 8h11M9.5 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        <footer className="mt-auto shrink-0 pt-6 md:pt-12">
          <div className="mb-5 md:mb-8">
            <PaintRule phase={phase} delay={700}>
              <span className="block h-px w-[min(72rem,88vw)] bg-white" />
            </PaintRule>
          </div>

          <div className="animate-fade-up flex flex-col gap-4 [animation-delay:1.3s] sm:flex-row sm:items-center sm:justify-between md:gap-6">
            <button
              type="button"
              aria-label="Minds Seen home"
              onClick={() => goTo(0)}
              className="w-fit transition-opacity hover:opacity-70"
            >
              <Image
                src="/images/logo-white.svg"
                alt="Minds Seen"
                width={199}
                height={48}
                className="h-6 w-auto md:h-7"
              />
            </button>

            <div className="flex flex-wrap gap-x-10 gap-y-3 text-[13px] text-white/90">
              <Link href="/terms" className="transition-opacity hover:opacity-70">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="transition-opacity hover:opacity-70">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
