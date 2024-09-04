export const PARTYKIT_HOST =
  process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "127.0.0.1:1999"
export const PROTOCOL = PARTYKIT_HOST.startsWith("127.0.0.1") || PARTYKIT_HOST.startsWith("localhost")
  ? "http"
  : "https"
export const PARTYKIT_URL = `${PROTOCOL}://${PARTYKIT_HOST}`