import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../lib/firebase-config.ts";
import { Button } from "@repo/ui";

export const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState<string | null>(null);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      try {
         await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
         setError((err as Error).message);
      }
   };

   return (
      <div className="w-full max-w-md">
      <form onSubmit={handleLogin} className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        {error && <div className="bg-destructive/10 text-destructive p-3 rounded mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-input rounded bg-background"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-input rounded bg-background"
            required
          />
        </div>

        <Button type="submit" className="w-full" variant="link">
          Login
        </Button>
      </form>
    </div>
   )
}