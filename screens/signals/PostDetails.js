import { View, Text, SafeAreaView, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import PostContent from "../../components/PostContent";
import { useNavigation } from "@react-navigation/native";

export default function PostDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: post.title,
      headerShown: true,
    });
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <PostContent post={post} />
    </SafeAreaView>
  );
}
