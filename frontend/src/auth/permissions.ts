export const ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  USER: "user",
} as const;

export const NAV_PERMISSIONS = {
  CONTENT_MANAGEMENT: [ROLES.ADMIN, ROLES.EMPLOYEE],
  EMPLOYEE_MANAGEMENT: [ROLES.ADMIN],
};
