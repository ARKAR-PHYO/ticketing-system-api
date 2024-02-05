import { ServiceAccount } from "firebase-admin";

export const firebaseAdminConfig = {
  projectId: "ticket-24c2a",
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
} satisfies ServiceAccount;

/**
 * Initialized firebase app
 */
