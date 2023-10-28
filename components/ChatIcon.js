import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatIcon() {
  const { navigate } = useNavigation();
  return (
    <View
      className="flex-row justify-end p-2"
      style={{ backgroundColor: "transparent" }}
    >
      <TouchableOpacity
        onPress={() => navigate("Support")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={Colors.lightGray} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    backgroundColor: Colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
});
