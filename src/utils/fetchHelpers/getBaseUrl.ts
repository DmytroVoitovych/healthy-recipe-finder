import { headers } from "next/headers";

let cachedBaseUrl: string | undefined;

export const getBaseUrl = async (): Promise<string> => {
  if (cachedBaseUrl) return cachedBaseUrl;

  const fallbackUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (typeof window !== "undefined") {
    cachedBaseUrl = window.location.origin;
    return cachedBaseUrl;
  }

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  cachedBaseUrl = host ? `${protocol}://${host}` : fallbackUrl;

  return cachedBaseUrl;
};

