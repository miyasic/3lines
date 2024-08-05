import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp(functions.config().firebase);

export const helloWorld1st = functions.https.onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
