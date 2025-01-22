// CoursesScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import ClassManager from "./../shared/ClassManager";

export default function CoursesScreen({ navigation }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    console.log(ClassManager.getClasses());
    setClasses(ClassManager.getClasses());
  }, []);

  const renderClass = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.classTitle}>{item.title}</Text>
      <Button
        title="View Details"
        onPress={() =>
          navigation.navigate("CourseDetails", { courseId: item.id })
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={renderClass}
        contentContainerStyle={styles.classList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f1e7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6b4f4f",
    textAlign: "center",
  },
  classList: {
    paddingBottom: 20,
  },
  classItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  classTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6b4f4f",
  },
});
