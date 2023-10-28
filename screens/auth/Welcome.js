import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[Colors.secondary, Colors.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />

          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />

          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 350,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: Colors.white,
            }}
          >
            Your Path to
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: Colors.white,
            }}
          >
            Profitable Trading
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.white,
                marginVertical: 2,
              }}
              className="text-center"
            >
              Reliable Forex Signals App : Maximize Profits with Precision.
            </Text>
            {/* <Text
              style={{
                fontSize: 16,
                color: Colors.white,
              }}
            >
              Maximize Profits with Precision.
            </Text> */}
          </View>

          <Button
            title="Join Now"
            onPress={() => navigation.navigate("Register")}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.white,
              }}
            >
              Already have an account ?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.white,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
