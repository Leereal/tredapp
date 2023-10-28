import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const instructions = [
  {
    id: 1,
    title: "Entering Signals",
    content:
      "Look at the price range of our signal. If the entry range/price matches the current market price, execute the signal immediately. If the entry price does not match the current market price, place a pending order using the provided prices.",
  },
  {
    id: 2,
    title: "Multiple Take Profit Levels",
    content:
      "If the signal includes more than one take profit level, divide your lot size to open positions equal to the number of take profits specified. For example, if there are Take Profit 1, Take Profit 2, Take Profit 3, and Take Profit 4, open four separate positions, each with its own take profit target and the same stop loss. Note that you have the flexibility to use your preferred trading strategy.",
  },
  {
    id: 3,
    title: "Moving Stop Loss",
    content:
      "When Take Profit 1 is reached, move the stop losses of the remaining positions to the entry price to protect your profits.",
  },
  {
    id: 4,
    title: "Avoid Manual Closure",
    content:
      "We do not recommend manually closing positions, whether they are in profit or in a loss unless you believe your profit is sufficient.",
  },
  {
    id: 5,
    title: "Risk Management",
    content:
      "Utilize small lot sizes to ensure good risk management. We advise entering positions with a risk of 2% of your account per trade.",
  },
  {
    id: 6,
    title: "Avoid Overtrading",
    content:
      "Do not engage in overtrading, as it can lead to increased risk and potential losses.",
  },
  {
    id: 7,
    title: "Avoid Greed",
    content:
      "Be mindful of greed in your trading decisions. Stick to your predefined strategy and risk management principles.",
  },
];

export default function Rules({ toggleModal }) {
  return (
    <View className="m-2  border border-gray-200 flex-1">
      <ScrollView>
        <View className="p-3">
          <Text className="text-lg font-bold">How to use our signals</Text>
          {instructions.map((item) => (
            <View key={item.id} className="py-1 flex-row">
              <View className="w-6 h-6 rotate-90 items-center justify-cente">
                <MaterialCommunityIcons name="bullet" size={24} color="black" />
              </View>
              <View className="px-1 mr-5">
                <Text className="text-md font-bold">{item.title}</Text>
                <Text className="text-justify">{item.content}</Text>
              </View>
            </View>
          ))}
          <View className="my-3">
            <Text className="text-xs font-extrabold">Disclaimer:</Text>
            <Text className="text-justify text-xs italic">
              Please be aware that trading leveraged assets carries inherent
              risks, and you should only invest what you can afford to lose. Our
              signals are intended for educational purposes and can be used at
              your discretion.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
