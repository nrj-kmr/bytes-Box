import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/firebase-admin";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
      }

      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(token);

      // Add user to request Object
      req.user = {
         uid: decodedToken.uid,
         email: decodedToken.email
      }

      next();
   } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
   }
}