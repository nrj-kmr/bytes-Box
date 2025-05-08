import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase-config";
import { Project } from "@repo/models";

export async function getUserProjects(userId: string): Promise<Project[]> {
   const projectsQuery = query(
      collection(db, "projects"),
      where("owner", "==", userId)
   );

   const snapshot = await getDocs(projectsQuery);
   return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
   })) as Project[];
}

export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
   const timestamp = Date.now();
   const docRef = await addDoc(collection(db, "projects"), {
      ...projectData,
      createdAt: timestamp,
      updatedAt: timestamp
   });
   return docRef.id;
}