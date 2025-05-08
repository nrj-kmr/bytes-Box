import { Express } from "express";

declare global {
   namespace Express {
      interface Request {
         user?: {
            uid: string;
            email?: string | null;
            displayName?: string | null;
         }
      }
   }
}

export{}