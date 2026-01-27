export function useAuth() {
  const token = localStorage.getItem("accesToken");
  const user = token
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

  const logout = () => {
    localStorage.removeItem("accesToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    logout,
  };
}
