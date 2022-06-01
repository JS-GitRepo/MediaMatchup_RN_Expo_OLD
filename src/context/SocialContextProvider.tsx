import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";

import "./SocialContextProvider.css";

const SocialContextProvider = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      // ^^ Line 17 will be utilized when authentication process is completed.
      // Should be functional after using "import auth from '@react-native-firebase/auth';"
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("Cancel");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        alert("Oops. Something went wrong.");
      }
    }
  };
  const signOut = async () => {
      try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setloggedIn(false);
          setuserInfo([]);
      } catch (error) {
          console.error(error)
      }
  }
  useEffect(() => {
      GoogleSignin.configure({
          scopes: ['email'],
          webClientId: 'AIzaSyB27Fa7JNqtjKj1ZS_B_1-LyOGqzlQjGrM.apps.googleusercontent.com',
          // ^^ Should be relevant later in the guide (changed to Firebase API key. Might be wrong! Who knows?)
          offlineAccess: true.
      });
  }, []);
  return (
    <View style={styles.SocialContextProvider}>
      SocialContextProvider works
    </View>
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
