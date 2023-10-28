import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { auth, database } from "../config/firebase";
import imageIcon from "../assets/images/eurusd.png";
import SignalCard from "../components/SignalCard";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ChatIcon } from "../components";

import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

export default function Home() {
  const navigation = useNavigation();
  const [signals, setSignals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const whatsappGroup = process.env.EXPO_PUBLIC_WHATSAPP_GROUP;
  useLayoutEffect(() => {
    navigation.setOptions({
      // title: (
      //   <Pressable onPress={() => navigation.navigate("Dashboard")}>
      //     <Image
      //       source={require("../assets/images/icon.png")}
      //       style={{ width: 30, height: 30, borderRadius: 100, marginLeft: 0 }}
      //     />
      //   </Pressable>
      // ),
      headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 30, height: 30, borderRadius: 100, marginLeft: 15 }}
          />
        </Pressable>
      ),
    });
  }, []);
  useLayoutEffect(() => {
    const signalRef = collection(database, "signals");
    const queryRef = query(signalRef, where("is_active", "==", true));
    const subscriber = onSnapshot(queryRef, {
      next: (snapShot) => {
        const signals = [];
        snapShot.forEach((doc) => {
          signals.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        // console.log("signals", signals);
        setSignals(signals);
      },
    });
    return () => subscriber();
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <FlatList
          data={signals}
          renderItem={({ item, index }) => (
            <SignalCard signal={item} imageIcon={imageIcon} />
          )}
          // refreshing={refreshing}
          // onRefresh={handleRefresh}
          ListEmptyComponent={
            <View className="items-center gap-2 p-10">
              <ActivityIndicator
                size={"large"}
                color={Colors.primary}
                animating={isLoading}
              />
              <FontAwesome name="database" size={24} color="black" />
              <Text className=""> No Signals Found</Text>
            </View>
          }
          ListHeaderComponent={
            <View className="p-3 items-center gap-2">
              <Text className="text-lg text-center capitalize font-medium">
                Please Read instructions first before using our signals
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignalRules")}
              >
                <Text className="text-sky-500 text-center uppercase">
                  Click for more info
                  <Ionicons
                    name="md-open-outline"
                    size={14}
                    color={Colors.primary}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={
            <View className="p-3 items-center gap-2">
              <Text className="text-lg text-center capitalize font-medium">
                END OF SIGNALS
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL(whatsappGroup)}>
                <Text className="text-sky-500 text-center uppercase">
                  Join Our Whatsapp Group
                  <Ionicons
                    name="md-open-outline"
                    size={14}
                    color={Colors.primary}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          }
          // keyExtractor={(item) => index.toString()}
          // ItemSeparatorComponent={<View style={{ height: 16 }} />}
        />
      </View>
      <ChatIcon />
    </SafeAreaView>
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
