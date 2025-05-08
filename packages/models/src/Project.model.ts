export interface Project {
   id: string;
   name: string;
   description: string | null;
   owner: string; // User UID
   collaborations?: string[] | null; // Array of User UIDs
   public: boolean;
   createdAt: number;
   updatedAt: number;
   language: string;
   files: ProjectFile[];
}

export interface ProjectFile {
   id: string;
   name: string;
   path: string;
   type: 'file' | 'directory';
   content?: string;
   lastModified: number;
}