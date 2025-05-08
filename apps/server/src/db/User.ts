import { db } from "../lib/firebase-admin";
import { User, UserSettings } from "@repo/models";

export async function createUser(userData: Omit<User, 'createdAt' | 'lastLogin'>): Promise<User> {
   const timestamp = Date.now();

   const newUser: User = {
      ...userData,
      createdAt: timestamp,
      lastLogin: timestamp
   };

   await db.collection('users').doc(userData.uid).set(newUser);

   return newUser;
}

export async function getUserById(uid: string): Promise<User | null> {
   const userDoc = await db.collection('user').doc(uid).get();

   if (!userDoc.exists) {
      return null;
   }
   return userDoc.data() as User;
}

export async function updateUserSettings(uid: string, settings: UserSettings): Promise<void> {
   await db.collection('user').doc(uid).update({
      settings: settings
   });
}