export function rejectIfunAuthorized(condition) {
  if (condition) {
    throw new Error("unAuth");
  }
}
