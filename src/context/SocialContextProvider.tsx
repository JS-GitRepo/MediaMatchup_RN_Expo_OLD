import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import SocialContext from "./SocialContext";
import { auth } from "../firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import React from "react";

interface Props {
  children: ReactNode;
}

const SocialContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "Your-Web-Client-ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <SocialContext.Provider value={{ user }}>{children}</SocialContext.Provider>
  );
};

const styles = StyleSheet.create({
  SocialContextProvider: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
});

export default SocialContextProvider;
