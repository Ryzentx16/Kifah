// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CoursesScreen from "./screens/CoursesScreen";
import CourseDetailsScreen from "./screens/CourseDetailsScreen";
import ChatbotScreen from "./screens/ChatbotScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AdminPanelScreen from "./screens/AdminPanelScreen";
import { TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ManageClassesScreen from "./screens/ManageClassesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const confirmLogout = (navigation) => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => navigation.replace("Login") },
    ]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPressOut={() => confirmLogout(navigation)}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPressOut={() => navigation.navigate("Chatbot")}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="chatbubbles" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="CoursesScreen"
          component={CoursesScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPressOut={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPressOut={() => navigation.navigate("Chatbot")}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="chatbubbles" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetailsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPressOut={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPressOut={() => navigation.navigate("Chatbot")}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="chatbubbles" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanelScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPressOut={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPressOut={() => navigation.navigate("Chatbot")}
            //     style={{ marginRight: 10 }}
            //   >
            //     <Ionicons name="chatbubbles" size={24} color="#6b4f4f" />
            //   </TouchableOpacity>
            // ),
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="ManageClasses"
          component={ManageClassesScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPressOut={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPressOut={() => navigation.navigate("Chatbot")}
            //     style={{ marginRight: 10 }}
            //   >
            //     <Ionicons name="chatbubbles" size={24} color="#6b4f4f" />
            //   </TouchableOpacity>
            // ),
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="Chatbot"
          component={ChatbotScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPressOut={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color="#6b4f4f" />
              </TouchableOpacity>
            ),
            headerShown: true,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
