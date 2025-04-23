
/**
 * Maps Firebase Auth error codes to user-friendly error messages.
 * @param errorCode - The Firebase Auth error code (e.g., "auth/invalid-credential").
 * @returns A user-friendly error message.
 */
export function mapFirebaseAuthError(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    "auth/invalid-credential": "Email or password is incorrect. Please try again.",
    "auth/user-not-found": "Account not found. Please check your details or sign up.",
    "auth/wrong-password": "Email or password is incorrect. Please try again.",
    "auth/email-already-in-use": "This email address is already registered. Please log in or reset your password.",
    "auth/weak-password": "The password provided is too weak. Please use a stronger password.",
    "auth/operation-not-allowed": "This authentication method is not enabled. Please contact support.",

    "auth/invalid-email": "The email address is invalid. Please provide a valid email.",
    "auth/account-exists-with-different-credential":
      "An account with this email already exists but is linked to a different login method. Try logging in with another method or reset your password.",
    "auth/requires-recent-login":
      "This operation requires a recent login. Please log out and log back in to proceed.",

    "auth/too-many-requests":
      "Too many unsuccessful attempts. Please try again later or reset your password.",
    "auth/network-request-failed": "A network error occurred. Please check your internet connection.",
    "auth/popup-closed-by-user": "The authentication popup was closed before completing the process.",
    "auth/cancelled-popup-request": "The authentication request was cancelled.",

    default: "An unexpected error occurred. Please try again later.",
  };

  return errorMessages[errorCode] || errorMessages.default;
}