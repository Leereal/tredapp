import { View, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import Button from "../../components/Button";
import { auth } from "../../config/firebase";
import { ChatIcon } from "../../components";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert("Logout Success");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  useLayoutEffect(() => {
    console.log("Profile Provider : ", auth?.currentUser.providerData); //Returns an array
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center mx-20 ">
        <Button
          title="Logout"
          outline
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={() => Logout()}
        />
      </View>
      <ChatIcon />
    </SafeAreaView>
  );
}
