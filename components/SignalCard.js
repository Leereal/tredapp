import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import FullSignal from "@/components/FullSignal";
// import BottomSheet from "@/components/BottomSheet";
Day.extend(relativeTime);

export default function SignalCard({ signal, imageIcon }) {
  //   const bottomSheetRef = useRef<BottomSheetModal>(null);
  //   const fullSignalRef = useRef<BottomSheetModal>(null);
  const [isMember, setIsMember] = React.useState(false);
  const [inTrial, setInTrial] = React.useState(false);
  //   const openModal = () => {
  //     if ((isMember || inTrial) && signal.is_premium)
  //       fullSignalRef.current?.present();
  //     else if (!signal.is_premium) fullSignalRef.current?.present();
  //     else bottomSheetRef.current?.present();
  //   };
  return (
    // <TouchableOpacity onPress={openModal}>
    <TouchableOpacity>
      {/* <BottomSheet ref={bottomSheetRef} /> */}
      {/* <FullSignal ref={fullSignalRef} signal={signal} /> */}
      <View
        className={`${
          signal.profit
            ? signal.profit > 0
              ? "bg-green-300"
              : "bg-red-200"
            : signal.is_active
            ? "bg-blue-200"
            : "bg-gray-200"
        } border border-gray-200 rounded-lg m-2 p-2 flex-row items-center`}
        style={{ elevation: 5 }}
      >
        <View className="p-2">
          <Image source={imageIcon} className="w-16 h-16" />
        </View>
        <View className="ml-2 flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="uppercase text-lg">{signal.symbol}</Text>
            <View>
              <Ionicons
                name="radio-button-on"
                size={24}
                color={signal.is_active ? "green" : "grey"}
              />
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text className="capitalize font-extrabold">{signal.type}</Text>
            <Text className="font-extrabold"> : </Text>
            <Text className="uppercase font-semibold">
              {signal.entry_range}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs font-bold text-green-700">
              Touch for TP and SL{" "}
              <FontAwesome name="hand-o-up" size={14} color="green" />
            </Text>
            <Text className="text-xs italic">
              {Day(signal.createdAt.toDate()).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
