export function useAuth() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return {
    user,
    isAuthenticated: !!user,
  };
}
