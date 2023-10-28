import { View, Text } from "react-native";
import React from "react";
import { database, auth } from "../config/firebase";
import {
  collection,
  deleteDoc,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  getDoc,
  doc,
  where,
  serverTimestamp,
} from "firebase/firestore";

export default function Latest() {
  const [signals, setSignals] = React.useState([]);
  const signalRef = collection(database, "signals");
  const c = {
    symbol: "EURCAR",
    entry_range: "1.0600 - 1.0610",
    stop_loss: 1.059,
    take_profit_1: 1.062,
    take_profit_2: 1.063,
    take_profit_3: 1.064,
    take_profit_4: 1.065,
    take_profit_5: 1.066,
    is_premium: false,
    is_active: false,
    profit: 0,
    type: "Buy",
    category: "forex",
    createdAt: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  };
  // getDocs(signalRef).then((querySnapshot) => {
  //   const signals = querySnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   console.log("Latest :", signals);
  // });
  // const docRef = doc(database, "signals", "kx4NeS9xH466UINGKfcj");  ;
  // deleteDoc(docRef);
  // addDoc(signalRef, c);
  const queryRef = query(
    signalRef,
    where("is_active", "==", false),
    orderBy("createdAt", "desc")
  );
  onSnapshot(signalRef, (snapShot) => {
    const signals = snapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("Latest :", signals);
  });
  return (
    <View>
      <Text>Latest</Text>
    </View>
  );
}
