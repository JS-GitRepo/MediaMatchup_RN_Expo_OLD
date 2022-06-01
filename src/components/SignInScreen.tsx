import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { GoogleSigninButton } from "react-native-google-signin";
import { Header } from "react-native/Libraries/NewAppScreen";
import "./SignInScreen.css";

const SignInScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Header />

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
              />
            </View>
            <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button
                  onPress={this.signOut}
                  // Lines 35-38 are pending context
                  title="LogOut"
                  color="red"
                ></Button>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  SignInScreen: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
});

export default SignInScreen;
