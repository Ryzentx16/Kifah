// HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = route.params || {};

  const renderContent = () => {
    switch (role) {
      case "student":
        return (
          <View>
            <Text style={styles.subtitle}>Welcome, Student!</Text>
            <Button
              title="View Courses"
              onPress={() => navigation.navigate("CoursesScreen")}
            />
          </View>
        );
      case "teacher":
        return (
          <View>
            <Text style={styles.subtitle}>Welcome, Teacher!</Text>
            <Button
              title="Manage Classes"
              onPress={() => navigation.navigate("ManageClasses")}
            />
          </View>
        );
      case "admin":
        return (
          <View>
            <Text style={styles.subtitle}>Welcome, Admin!</Text>
            <Button
              title="Admin Panel"
              onPress={() => navigation.navigate("AdminPanel")}
            />
          </View>
        );
      default:
        return <Text style={styles.subtitle}>Welcome!</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f1e7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6b4f4f",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#6b4f4f",
  },
});
