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
import { Icon } from "./ui/LucidIcons.tsx";
import { User } from "lucide-react";

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
      <div
        className="pointer-events-none absolute inset-0 h-full w-full bg-gray-200 dark:bg-gray-900 z-0"
        aria-hidden="true"
      >
        <div
          className="
                    absolute inset-0
                    bg-[linear-gradient(to_right,#8fcaa5_0.1px,transparent_0.5px),linear-gradient(to_bottom,#8fcaa5_0.1px,transparent_0.5px)]
                    bg-[size:20px_18px]
                    [mask-image:radial-gradient(ellipse_60%_30%_at_30%_0%,#000_40%,transparent_210%)]
                    dark:bg-[linear-gradient(to_right,#8fcaa5_0px,transparent_0.3px),linear-gradient(to_bottom,#8fcaa5_0px,transparent_0.3px)]
                "
        ></div>
      </div>
      <div className="h-full flex flex-col items-center justify-center z-10">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger
              value="login"
              className="cursor-pointer data-[state=active]:bg-primary bg-card data-[state=active]:text-primary-foreground hover:bg-accent shadow-sm"
            >
              Log In
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="cursor-pointer data-[state=active]:bg-primary bg-card data-[state=active]:text-primary-foreground hover:bg-accent shadow-sm"
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
                        className="w-full px-4 cursor-pointer bg-transparent hover:bg-accent hover:text-accent-foreground"
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
                        className="w-full px-4 bg-transparent hover:bg-accent hover:text-accent-foreground"
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
            variant="secondary"
            onClick={signupWithGoogle}
            className="hover:bg-primary hover:text-primary-foreground shadow-sm"
          >
            <div className="flex justify-center gap-2">
              <img src="google.png" alt="" className="w-5 h-5" />
              Sigin with Google
            </div>
          </Button>
          <Button
            variant="secondary"
            onClick={signInAnon}
            className="hover:bg-primary hover:text-primary-foreground shadow-sm"
          >
            <div className="flex justify-center gap-2">
              <Icon icon={User} />
              Sign in Anonymously
            </div>
          </Button>
        </Tabs>
      </div>
    </div >
  )
}