let cachedBaseUrl: string | undefined;

export const getBaseUrl = (): string => {
  if (cachedBaseUrl) return cachedBaseUrl;

  if (typeof window !== "undefined") {
    cachedBaseUrl = window.location.origin;
    return cachedBaseUrl;
  }

  cachedBaseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return cachedBaseUrl;
};
