import React, { useState, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
  or,
  and,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";

export default function SupportChat() {
  const [messages, setMessages] = useState([]);

  const navigation = useNavigation();
  const admin =
    auth?.currentUser?.email === process.env.EXPO_PUBLIC_ADMIN_EMAIL
      ? true
      : false;

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(
      collectionRef,
      and(
        where("support", "==", true),
        or(
          where("recipient", "==", auth?.currentUser?.email),
          where("user._id", "==", auth?.currentUser?.email)
        )
      ),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
      support: true,
      recipient: "",
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: "https://i.pravatar.cc/300",
        name: auth?.currentUser?.displayName,
      }}
    />
  );
}
