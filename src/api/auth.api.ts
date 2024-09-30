const baseUrl = process.env.REACT_APP_API_URL || "https://frontend-take-home-service.fetch.com";

export const loginApi = async (name: string, email: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    body: JSON.stringify({ email, name }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
};

export const logoutApi = async (): Promise<void> => {
  const response = await fetch(`${baseUrl}/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
