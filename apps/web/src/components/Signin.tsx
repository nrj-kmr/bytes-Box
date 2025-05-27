import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db, googleProvider } from "../lib/firebase-config.ts";
import {
  Button,
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Input,
  Label,
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@repo/ui";
import { Appbar } from "./ui/Appbar.tsx";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user-id', email);
      navigate('/workspace');
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.email?.split('@')[0],
        createdAt: new Date().toISOString(),
      });
      alert('success, created user');
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user-id', email);
      navigate('/workspace');
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.email?.split('@')[0],
        lastLogin: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      localStorage.setItem('user-id', user.uid);
      navigate('/workspace');
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.email?.split('@')[0],
        lastLogin: new Date().toISOString(),
      }, { merge: true })
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const signInAnon = async () => {
    setError(null);
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      localStorage.setItem('user-id', user.uid);
      navigate('/workspace');
      await setDoc(doc(db, "users", user.uid), {
        isAnonymous: true,
        createdAt: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Appbar />
      <div className="h-full flex flex-col items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger
              value="login"
              className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Log In
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="rounded-lg p-4">
              <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>Login to Save your progress</CardDescription>
              </CardHeader>

              {error && <div className="bg-destructive/20 text-destructive text-center p-3 rounded-lg my-4">{error}</div>}
              <CardContent>
                <form onSubmit={handleSignIn}>
                  <div className="grid w-full items-center gap-4 mt-4">

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

                    <div className="flex justify-between mt-5 mb-5 space-x-2">
                      <Button
                        variant="outline"
                        className="w-full px-4 cursor-pointer bg-transparent hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => navigate('/')}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full px-4 cursor-pointer bg-transparent"
                      >
                        Login
                      </Button>
                    </div>

                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="register">
            <Card className="rounded-lg p-4">
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Register yourself.</CardDescription>
              </CardHeader>

              {error && <div className="bg-destructive/10 text-destructive p-3 rounded mb-4">{error}</div>}
              <CardContent>
                <form onSubmit={createNewUser}>
                  <div className="grid w-full items-center gap-4 mt-4">

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

                    <div className="flex justify-between mt-5 mb-5 space-x-2">
                      <Button
                        variant="outline"
                        className="w-full px-4 hover:text-destructive-foreground bg-transparent hover:bg-destructive"
                        onClick={() => navigate('/')}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full px-4 bg-transparent"

                      >
                        Register
                      </Button>
                    </div>

                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <p className="text-center">OR</p>

          <Button
            variant="outline"
            onClick={signupWithGoogle}
          >
            Sigin with Google
          </Button>
          <Button
            variant="outline"
            onClick={signInAnon}
          >
            Sign in Anonymously
          </Button>
        </Tabs>
      </div>
    </div >
  )
}