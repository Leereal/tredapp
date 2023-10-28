import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

export default function CreateSignal() {
  const route = useRoute();
  const params = route.params;
  const [formData, setFormData] = useState({
    symbol: "",
    entry_range: "",
    stop_loss: 0,
    take_profit_1: 0,
    take_profit_2: 0,
    take_profit_3: 0,
    take_profit_4: 0,
    take_profit_5: 0,
    is_premium: false,
    is_active: true,
    profit: 0,
    type: "",
    category: "forex",
    createdAt: new Date(),
    updated_at: null,
    deleted_at: null,
  });

  const signalsRef = collection(database, "signals");

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.symbol) {
      newErrors.symbol = "Symbol is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (params && params.symbol) {
      setFormData(params);
    }
  }, []);

  const handleFieldChange = (fieldId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (!params?.id) {
        try {
          const doc = await addDoc(signalsRef, formData);
          if (doc) {
            console.log(doc);
            setFormData({
              symbol: "",
              entry_range: "",
              stop_loss: 0,
              take_profit_1: 0,
              take_profit_2: 0,
              take_profit_3: 0,
              take_profit_4: 0,
              take_profit_5: 0,
              is_premium: false,
              is_active: true,
              profit: 0,
              type: "",
              category: "forex",
              createdAt: serverTimestamp(),
              updated_at: null,
              deleted_at: null,
            });
            alert("Data added successfully");
          } else {
            alert("Error adding data");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        updateData();
      }
    }
  };

  const updateData = async () => {
    try {
      const signalRef = doc(database, "signals", params.id);
      await updateDoc(signalRef, formData);
      alert("Data updated successfully");
    } catch (error) {
      alert("Error updating signal");
      console.error("Error updating signal: ", error);
    }
  };

  const fields = [
    {
      id: "symbol",
      title: "Symbol",
      placeholder: "Enter Symbol",
      value: formData.symbol,
      keyboard: "default",
    },
    {
      id: "type",
      title: "Type",
      placeholder: "Enter Type",
      value: formData.type,
      keyboard: "default",
    },
    {
      id: "entry_range",
      title: "Entry Range",
      placeholder: "Enter Entry Range",
      value: formData.entry_range,
      keyboard: "numeric",
    },
    {
      id: "stop_loss",
      title: "Stop Loss",
      placeholder: "Enter Stop Loss",
      value: formData.stop_loss,
      keyboard: "numeric",
    },
    {
      id: "take_profit_1",
      title: "Take Profit 1",
      placeholder: "Enter Take Profit 1",
      value: formData.take_profit_1,
      keyboard: "numeric",
    },
    {
      id: "take_profit_2",
      title: "Take Profit 2",
      placeholder: "Enter Take Profit 2",
      value: formData.take_profit_2,
      keyboard: "numeric",
    },
    {
      id: "take_profit_3",
      title: "Take Profit 3",
      placeholder: "Enter Take Profit 3",
      value: formData.take_profit_3,
      keyboard: "numeric",
    },
    {
      id: "take_profit_4",
      title: "Take Profit 4",
      placeholder: "Enter Take Profit 4",
      value: formData.take_profit_4,
      keyboard: "numeric",
    },
    {
      id: "take_profit_5",
      title: "Take Profit 5",
      placeholder: "Enter Take Profit 5",
      value: formData.take_profit_5,
      keyboard: "numeric",
    },
  ];

  return (
    <KeyboardAvoidingView
    // behavior="padding"
    // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView>
        <View className="p-6">
          {fields.map((field) => (
            <View key={field.id}>
              <TextInput
                value={field.value.toString()}
                placeholder={field.placeholder}
                keyboardType={field.keyboard}
                onChangeText={(text) => handleFieldChange(field.id, text)}
                className="p-2 border-2 border-slate-300 rounded-lg m-2 text-medium"
              />
              {errors[field.id] && (
                <Text className="text-red-300 text-xs font-medium m-2">
                  {errors[field.id]}
                </Text>
              )}
            </View>
          ))}
          <View className="flex-row items-center justify-between m-2">
            <Text className="text-md font-medium">Premium Signal</Text>
            {formData.is_premium && (
              <Text className="text-xs font-medium uppercase text-green-400">
                Premium Only
              </Text>
            )}
            <Switch
              value={formData.is_premium}
              onValueChange={() =>
                setFormData((previousState) => ({
                  ...formData,
                  is_premium: !previousState.is_premium,
                }))
              }
            />
          </View>
          <View className="flex-row items-center justify-between m-2">
            <Text className="text-md font-medium">Activate Signal</Text>
            {formData.is_active && (
              <Text className="text-xs font-medium uppercase text-green-400">
                Running...
              </Text>
            )}
            <Switch
              value={formData.is_active}
              onValueChange={() =>
                setFormData((previousState) => ({
                  ...formData,
                  is_active: !previousState.is_active,
                }))
              }
            />
          </View>
        </View>

        {/* footer  */}
        <View className=" p-3 border-2-0 bg-white">
          <TouchableOpacity
            className="p-4 items-center justify-center rounded-lg"
            style={{ backgroundColor: Colors.primary }}
            onPress={() => handleSubmit()}
          >
            <Text className="text-white font-bold text-lg ">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* endfooter  */}
    </KeyboardAvoidingView>
  );
}
