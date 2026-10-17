import fs from "node:fs";
import path from "node:path";

const PLACEHOLDER = "__SET_THIS_ON_THE_SERVER__";

export function getSmtpPasswordFromEnv(): string {
  return String(process.env.SMTP_PASS ?? process.env.SMTP_PASSWORD ?? "").trim();
}

export function isSmtpPassConfigured(): boolean {
  const pass = getSmtpPasswordFromEnv();
  return pass.length > 0 && pass !== PLACEHOLDER;
}

export function missingSmtpPassHint(options?: {
  envFilePath?: string;
  envFileExists?: boolean;
}): string {
  const envPath = options?.envFilePath ?? ".env.local";
  const exists = options?.envFileExists ?? false;
  if (!exists) {
    return (
      `No SMTP password in the process environment and no ${envPath} file was found. ` +
      `Create ${envPath} in the project root, set SMTP_PASS="your-mailbox-password" (or SMTP_PASSWORD), and restart the app.`
    );
  }

  return (
    `${envPath} exists but SMTP_PASS / SMTP_PASSWORD is empty or still the placeholder. ` +
    `Set SMTP_PASS="your-mailbox-password" (quote the value if it contains #) and restart the app.`
  );
}

export function mailHealthPayload(repoRoot?: string): Record<string, unknown> {
  const smtpConfigured = isSmtpPassConfigured();
  const payload: Record<string, unknown> = {
    ok: true,
    platform: "node",
    smtpConfigured,
  };

  if (repoRoot) {
    const envPath = path.join(repoRoot, ".env.local");
    payload.envFile = envPath;
    payload.envFileExists = fs.existsSync(envPath);
  }

  if (!smtpConfigured) {
    payload.hint = missingSmtpPassHint({
      envFilePath: repoRoot ? path.join(repoRoot, ".env.local") : ".env.local",
      envFileExists: repoRoot
        ? fs.existsSync(path.join(repoRoot, ".env.local"))
        : undefined,
    });
  }

  return payload;
}
