import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Home,
  Notifications,
  Preference,
  Settings,
  PostDetails,
  GroupChat,
  SupportChat,
  Login,
  Register,
  Welcome,
  CreateSignal,
  History,
  Profile,
  Rules,
} from "./screens";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StatusBar,
  useColorScheme,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Colors from "./constants/Colors";
import { auth } from "./config/firebase";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

//Auth
const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

//Drawer
const Drawer = createDrawerNavigator();
function DrawerContent(props) {
  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert("Logout Success");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  return (
    <DrawerContentScrollView {...props}>
      <View className="flex-1">
        <View className="gap-2 mb-6 p-3 border-b-2 border-b-slate-200 items-center">
          <Ionicons name="person-circle" size={30} color={Colors.primary} />
          <Text className="font-bold">{auth.currentUser.email}</Text>
        </View>
        <DrawerItemList {...props} labelStyle={{}} />
        <DrawerItem label="Help" />
      </View>
      <View>
        <TouchableOpacity onPress={Logout} className="p-3">
          <View className="flex-row gap-1 items-center">
            <Ionicons name="log-out" size={30} color="red" />
            <Text className="text-red-400 font-extrabold">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
function DrawerGroup({ navigation }) {
  // const navigation = useNavigation();
  const currentTheme = useColorScheme();
  return (
    <Drawer.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        headerRight: () => (
          <Pressable
            onPress={() => {
              console.log("Toggle Theme");
            }}
          >
            <Ionicons
              name={currentTheme === "dark" ? "sunny" : "moon"}
              size={24}
              color={currentTheme === "dark" ? "white" : "black"}
              style={{ marginRight: 15 }}
            />
          </Pressable>
        ),
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              source={require("./assets/images/icon.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                marginLeft: 15,
              }}
            />
          </Pressable>
        ),
      })}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Dashboard" component={StackGroup} />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: "My Profile",
          drawerLabel: "My Profile",
        }}
      />
      <Drawer.Screen
        name="CreateSignal"
        component={CreateSignal}
        options={{ headerShown: true, headerTitle: "New Signal" }}
      />
      <Drawer.Screen
        name="Preference"
        component={Preference}
        options={{ headerShown: true, headerTitle: "Preference" }}
      />
    </Drawer.Navigator>
  );
}
//Stack
const Stack = createNativeStackNavigator();
function StackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabGroup"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
}

//Tab Bottom
const Tab = createBottomTabNavigator();

function TabGroup() {
  const navigation = useNavigation();
  const currentTheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        cardStyle: { backgroundColor: Colors.bgMain },
        headerTitleAlign: "center",
        headerTitle: "",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "NotificationsGroup") {
            iconName = focused
              ? "ios-notifications"
              : "ios-notifications-outline";
          } else if (route.name === "SettingsGroup") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        headerRight: () => (
          <Pressable
            onPress={() => {
              console.log("Toggle Theme");
            }}
          >
            <Ionicons
              name={currentTheme === "dark" ? "sunny" : "moon"}
              size={24}
              color={currentTheme === "dark" ? "white" : "black"}
              style={{ marginRight: 15 }}
            />
          </Pressable>
        ),
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              source={require("./assets/images/icon.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                marginLeft: 15,
              }}
            />
          </Pressable>
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={TopTabsGroup} />
      <Tab.Screen
        name="NotificationsGroup"
        component={NotificationTabsGroup}
        options={{ tabBarLabel: "Notifications" }}
      />
      <Tab.Screen
        name="SettingsGroup"
        component={SettingsTabsGroup}
        options={{ tabBarLabel: "Settings" }}
      />
    </Tab.Navigator>
  );
}

const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen
        name="main"
        component={Home}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <TopTabs.Screen name="History" component={History} />
      <TopTabs.Screen name="Support" component={SupportChat} />
    </TopTabs.Navigator>
  );
}

function NotificationTabsGroup() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Notifications",
        }}
      />
      <TopTabs.Screen
        name="SignalRules"
        component={Rules}
        options={{
          tabBarLabel: "Signal Rules",
        }}
      />
    </TopTabs.Navigator>
  );
}

function SettingsTabsGroup() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen name="Profile" component={Profile} />
      <TopTabs.Screen name="Preference" component={Preference} />
      <TopTabs.Screen name="Settings" component={Settings} />
    </TopTabs.Navigator>
  );
}

function RootNavigator() {
  const currentTheme = useColorScheme();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // const [theme, setTheme] = useState(currentTheme);
  // const toggleTheme = () => {
  //   const nextTheme = theme === "dark" ? "light" : "dark";
  //   setTheme(nextTheme);
  // };
  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style="auto" />
      {user ? <DrawerGroup /> : <AuthStack />}
    </NavigationContainer>
  );
}
export default function Navigation() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
