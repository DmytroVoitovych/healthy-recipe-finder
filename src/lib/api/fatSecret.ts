import crypto from "crypto";

export interface OAuthParams {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature_method: string;
  oauth_timestamp: number;
  oauth_version: string;
  oauth_signature?: string;
  oauth_token?: string;
}

export const generateNonce = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

export const getTimestamp = (): number => {
  const timestamp = Math.floor(Date.now() / 1000);
  return timestamp;
};

export const percentEncode = (str: string): string => {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
};

export const createSignatureBaseString = (
  method: string,
  url: string,
  params: Record<string, string | number>
): string => {
  const paramsWithoutSignature = { ...params };
  delete paramsWithoutSignature.oauth_signature;

  const filteredParams = Object.fromEntries(
    Object.entries(paramsWithoutSignature).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  );

  const sortedParams = Object.entries(filteredParams)
    .map(([key, value]) => [percentEncode(key), percentEncode(String(value))])
    .sort(
      ([aKey, aVal], [bKey, bVal]) =>
        aKey.localeCompare(bKey) || aVal.localeCompare(bVal)
    )
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(sortedParams),
  ].join("&");

  return baseString;
};

export const createSigningKey = (
  consumerSecret: string,
  tokenSecret: string = ""
): string => {
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(
    tokenSecret
  )}`;

  return signingKey;
};

export const generateSignature = (
  baseString: string,
  signingKey: string
): string => {
  const signature = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  return signature;
};

export const createFatSecretUrlRequest = (
  httpMethod: "GET" | "POST",
  apiPath: string,
  params: Record<string, string | number>,
  consumerKey: string,
  consumerSecret: string,
  token?: string,
  tokenSecret: string = ""
): string => {
  if (!consumerKey || !consumerSecret) {
    throw new Error("Consumer key and secret are required");
  }

  const baseUrl = `${process.env.FATSECRET_BASE_URL}${apiPath}`;

  const oauthParams: OAuthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: generateNonce(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: getTimestamp(),
    oauth_version: "1.0",
    ...(token && { oauth_token: token }),
  };

  const allParamsForSignature = { ...params, ...oauthParams };

  const baseString = createSignatureBaseString(
    httpMethod,
    baseUrl,
    allParamsForSignature
  );
  const signingKey = createSigningKey(consumerSecret, tokenSecret);
  const signature = generateSignature(baseString, signingKey);

  oauthParams.oauth_signature = signature;

  const finalParams = { ...params, ...oauthParams };

  const queryString = Object.entries(finalParams)
    .map(([key, value]) => `${percentEncode(key)}=${percentEncode(String(value))}`)
    .join("&");

  const finalUrl = `${baseUrl}?${queryString}`;

  return finalUrl;
};
