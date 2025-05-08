import path from "node:path";
import fs from "node:fs";
import admin from 'firebase-admin'

// Check the environment - production or development
const isProduction = process.env.NODE_ENV === 'production';

// Initialize firebase admin
if (!admin.apps.length) {
   if (isProduction) {
      // in production, use environment variables
      admin.initializeApp({
         credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
         })
      })
   } else {
      // In development use service account file
      const serviceAccountPath = path.resolve(__dirname, '../../../service-account.json');
      if(fs.existsSync(serviceAccountPath)){
         const serviceAccount = require(serviceAccountPath);
         admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
         });
      } else {
         console.error('Service Account file not found. Please add it to the root of the server App.');
         process.exit(1);
      }
   }
}

export const auth = admin.auth();
export const db = admin.firestore();