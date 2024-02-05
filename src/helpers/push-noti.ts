import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { firebaseAdminConfig } from "../config/firebase-config";
import { getMessaging } from "firebase-admin/messaging";

export const FirebaseApp = initializeApp({
  credential: credential.cert(firebaseAdminConfig),
});

export async function sendNotification(tokenList: [], cb: any) {
  await getMessaging(FirebaseApp)
    .sendEach(tokenList)
    .then(cb ? cb : (result) => console.log(result.responses));
}
