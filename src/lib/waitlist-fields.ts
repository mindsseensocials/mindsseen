const FIELD_LIMIT = 120;
const EMAIL_LIMIT = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistFieldInput = {
  name: string;
  email: string;
  company: string;
  role: string;
};

export type WaitlistFieldInvalid = {
  name: boolean;
  email: boolean;
  company: boolean;
  role: boolean;
};

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function validateWaitlistFields(input: WaitlistFieldInput): {
  message: string | null;
  invalid: WaitlistFieldInvalid;
} {
  const name = clean(input.name);
  const email = input.email.trim().toLowerCase();
  const company = clean(input.company);
  const role = clean(input.role);

  const invalid = {
    name: name.length === 0 || name.length > FIELD_LIMIT,
    email: !EMAIL_PATTERN.test(email) || email.length > EMAIL_LIMIT,
    company: company.length === 0 || company.length > FIELD_LIMIT,
    role: role.length === 0 || role.length > FIELD_LIMIT,
  };

  const missing: string[] = [];
  if (invalid.name) missing.push("your full name");
  if (!email) missing.push("your email address");
  else if (invalid.email) missing.push("a valid email address");
  if (invalid.company) missing.push("your company");
  if (invalid.role) missing.push("your role");

  if (missing.length === 0) {
    return { message: null, invalid };
  }
  if (missing.length === 1) {
    return { message: `Enter ${missing[0]}.`, invalid };
  }

  const last = missing[missing.length - 1];
  return {
    message: `Enter ${missing.slice(0, -1).join(", ")} and ${last}.`,
    invalid,
  };
}
