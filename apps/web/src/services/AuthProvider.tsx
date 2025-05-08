import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authLoadingState, userState } from "../store/authAtom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/lib/firebase-config";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const setUser = useSetRecoilState(userState);
   const setAuthLoading = useSetRecoilState(authLoadingState);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user);
         setAuthLoading(false);
      })

      return () => unsubscribe();
   }, [setUser, setAuthLoading]);

   return <>{ children } </>
};