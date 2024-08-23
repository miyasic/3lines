import { https } from "firebase-functions";
import * as logger from "firebase-functions/logger";


export const helloWorld = https.onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from ThreeLines");
});
