import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../lib/firebase-config.ts";
import { Button } from "@repo/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">

      <Card className="w-[350px] rounded-lg p-4">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Login to Save your progress</CardDescription>
        </CardHeader>

        {error && <div className="bg-destructive/10 text-destructive p-3 rounded mb-4">{error}</div>}
        <CardContent>
          <form onSubmit={handleSignIn}>

            <div className="grid w-full items-center gap-4 mt-4">

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Benjamin Dusk"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="domi@tusk.org ✉️"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="topSecret 🤫"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between mt-5">
          <Button
            variant="outline"
            className="px-4 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 bg-black text-white dark:bg-white dark:text-black cursor-pointer"
          >
            Sigin
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}