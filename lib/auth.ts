export interface AuthUser {
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google";
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("pb_user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function storeUser(user: AuthUser): void {
  localStorage.setItem("pb_user", JSON.stringify(user));
  // Notify other components in the same tab
  window.dispatchEvent(new Event("pb_auth_change"));
}

export function clearUser(): void {
  localStorage.removeItem("pb_user");
  window.dispatchEvent(new Event("pb_auth_change"));
}

export function getFirstName(user: AuthUser): string {
  return user.name.split(" ")[0];
}
