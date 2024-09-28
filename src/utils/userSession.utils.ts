export function userSessionExists(): boolean {
  return document.cookie.split("; ").some((cookie) => cookie.startsWith("user_session="));
}
