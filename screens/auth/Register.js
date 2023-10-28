import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../../components/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { doc, addDoc, collection } from "firebase/firestore";

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    country_code: "",
    displayName: "",
  });

  const handleSignup = () => {
    if (!formData.displayName) return alert("Please enter your full name");
    if (!formData.email || !formData.password || !formData.phone)
      return alert("Please fill all the fields");
    if (!isChecked) return alert("Please agree to the terms and conditions");
    if (!formData.country_code)
      return alert("Please enter a valid country code");
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          phoneNumber: formData.phone,
          displayName: formData.displayName,
        })
          .then(() => {
            createProfile(
              auth,
              {
                user_id: user.uid,
                country_code: formData.country_code,
                is_premium: false,
                is_active: true,
                is_trial: false,
                is_admin: false,
                is_verified: false,
                is_banned: false,
                is_deleted: false,
                is_blocked: false,
              },
              user.uid
            );
          })
          .catch((error) => {
            alert("Error updating phone and fullname");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const createProfile = async (data) => {
    const profilesRef = collection(database, "profiles");
    addDoc(profilesRef, data)
      .then(() => {
        alert("Signup Success");
      })
      .catch((error) => {
        alert("Error registering additional info");
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: Colors.black,
              }}
            >
              Create Account
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: Colors.black,
              }}
            >
              Get the best trading signals!
            </Text>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 5,
              }}
            >
              Full Name
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: Colors.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={Colors.lightGray}
                autoCapitalize="words"
                keyboardType="default"
                onChangeText={(text) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    displayName: text,
                  }))
                }
                value={formData.displayName}
                autoFocus={true}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: Colors.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={Colors.lightGray}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    email: text,
                  }))
                }
                value={formData.email}
                autoFocus={true}
                textContentType="emailAddress"
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Mobile Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: Colors.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="+27"
                placeholderTextColor={Colors.lightGray}
                keyboardType="default"
                onChangeText={(text) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    country_code: text,
                  }))
                }
                value={formData.country_code}
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderLeftColor: Colors.neutral,
                  height: "100%",
                }}
              />
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={Colors.lightGray}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    phone: text,
                  }))
                }
                value={formData.phone}
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  width: "80%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: Colors.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={Colors.lightGray}
                secureTextEntry={isPasswordShown}
                onChangeText={(text) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    password: text,
                  }))
                }
                value={formData.password}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
                style={{
                  width: "100%",
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={Colors.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={Colors.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? Colors.primary : undefined}
            />

            <Text>I agree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleSignup}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: Colors.neutral,
                marginHorizontal: 10,
              }}
            />
            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: Colors.neutral,
                marginHorizontal: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: Colors.neutral,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../../assets/images/facebook.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: Colors.neutral,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../../assets/images/google.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Google</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: Colors.black }}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
