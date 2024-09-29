export const USER_SESSION_COOKIE_NAME = "user_session=";

export function userSessionExists(): boolean {
  return document.cookie.split("; ").some((cookie) => cookie.startsWith(USER_SESSION_COOKIE_NAME));
}

export function setUserSession(name: string): void {
  const expirationTime = new Date(Date.now() + 3600 * 1000).toUTCString();
  const cookieValue = `${USER_SESSION_COOKIE_NAME}${encodeURIComponent(name)}; expires=${expirationTime}; path=/;`;

  document.cookie = cookieValue;
}

export function getUserName(): string | null {
  const cookies = document.cookie.split("; "); // Split cookies on `; `

  const userSessionCookie = cookies.find((cookie) => cookie.startsWith(USER_SESSION_COOKIE_NAME));

  return userSessionCookie ? userSessionCookie.substring(USER_SESSION_COOKIE_NAME.length) : null;
}
