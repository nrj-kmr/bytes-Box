export interface User {
   uid: string;
   email: string | null;
   displayName: string | null;
   photoURL?: string | null;
   createdAt: number;
   lastLogin: number;
   settings?: UserSettings;
}

export interface UserSettings {
   theme: 'light' | 'dark' | 'system';
   fontSize: number;
   tabSize: number;
   editorPreferences: {
      wordWrap: boolean;
      lineNumber: boolean;
      minimap: boolean;
   }
}