import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PostContent from "./PostContent";
import React from "react";

export default function Post({ post }) {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigate("PostDetails", { post });
      }}
    >
      <PostContent />
    </Pressable>
  );
}
