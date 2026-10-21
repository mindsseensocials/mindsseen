"use server";

import { Resend } from "resend";

const SEGMENT_ID =
  process.env.RESEND_SEGMENT_ID ?? "8ca69ac6-3f52-46df-b6f9-6854122a8ba5";
const FROM = process.env.RESEND_FROM ?? "Minds Seen <hello@mindsseenlab.com>";
const FIELD_LIMIT = 120;
const EMAIL_LIMIT = 254;

export type JoinWaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
};

function readText(formData: FormData, key: string) {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  return raw.trim().replace(/\s+/g, " ");
}

function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.split(" ");
  return { firstName, lastName: rest.join(" ") };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isDuplicate(error: { statusCode: number | null; message: string }) {
  return error.statusCode === 409 || /already exists/i.test(error.message);
}

export async function joinWaitlist(
  _previous: JoinWaitlistState,
  formData: FormData,
): Promise<JoinWaitlistState> {
  const name = readText(formData, "name");
  const email = readText(formData, "email").toLowerCase();
  const company = readText(formData, "company");
  const role = readText(formData, "role");
  const consent = formData.get("consent") === "on";

  if (!name || name.length > FIELD_LIMIT) {
    return { status: "error", message: "Enter your full name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > EMAIL_LIMIT) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (!company || company.length > FIELD_LIMIT) {
    return { status: "error", message: "Enter your company." };
  }
  if (!role || role.length > FIELD_LIMIT) {
    return { status: "error", message: "Enter your role." };
  }
  if (!consent) {
    return {
      status: "error",
      message: "Agree to receive information when Minds Seen is live.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: "The waitlist is unavailable right now. Please try again later.",
    };
  }

  const resend = new Resend(apiKey);
  const { firstName, lastName } = splitName(name);
  const properties = { company, role };
  const created = await resend.contacts.create({
    email,
    firstName,
    lastName: lastName || undefined,
    unsubscribed: false,
    properties,
    segments: [{ id: SEGMENT_ID }],
  });

  if (created.error) {
    if (!isDuplicate(created.error)) {
      console.error("Resend contact create failed", created.error);
      return {
        status: "error",
        message: "We couldn't add you to the waitlist. Please try again.",
      };
    }

    const updated = await resend.contacts.update({
      email,
      firstName,
      lastName: lastName || null,
      unsubscribed: false,
      properties,
    });
    if (updated.error) {
      console.error("Resend contact update failed", updated.error);
      return {
        status: "error",
        message: "We couldn't add you to the waitlist. Please try again.",
      };
    }

    const segmented = await resend.contacts.segments.add({
      email,
      segmentId: SEGMENT_ID,
    });
    if (segmented.error && !isDuplicate(segmented.error)) {
      console.error("Resend segment add failed", segmented.error);
      return {
        status: "error",
        message: "We couldn't add you to the waitlist. Please try again.",
      };
    }
  }

  const greetingName = escapeHtml(firstName);
  const sent = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You're on the Minds Seen waitlist",
    html: `<p>Hi ${greetingName},</p><p>You're on the list. We'll send you information when Minds Seen is live.</p><p>Minds Seen</p>`,
    text: `Hi ${firstName},\n\nYou're on the list. We'll send you information when Minds Seen is live.\n\nMinds Seen`,
  });

  if (sent.error) {
    console.error("Resend email failed", sent.error);
    return {
      status: "error",
      message: "We couldn't send the confirmation. Please try again.",
    };
  }

  return {
    status: "success",
    message: "You're on the list. We'll write when Minds Seen is live.",
  };
}
