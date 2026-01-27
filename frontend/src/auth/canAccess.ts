export function canAccess(
  userRoles: string[],
  allowedRoles: string[],
): boolean {
  return userRoles.some((role) => allowedRoles.includes(role));
}
