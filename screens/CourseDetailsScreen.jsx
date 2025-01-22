// CourseDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import ClassManager from "../shared/ClassManager";

export default function CourseDetailsScreen() {
  const route = useRoute();
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const selectedCourse = ClassManager.getClasses().find(
      (cls) => cls.id == courseId
    );
    if (selectedCourse) {
      setCourse(selectedCourse);
    } else {
      Alert.alert("Error", "Course not found.");
    }
    console.log(selectedCourse);
  }, [courseId]);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Course not found.</Text>
      </View>
    );
  }

  const now = new Date();
  const courseTime = new Date(course.time);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>
        Scheduled Time: {courseTime.toLocaleString()}
      </Text>
      {now < courseTime ? (
        <Button
          title="Join Zoom Meeting"
          onPress={() =>
            Alert.alert("Joining Zoom", `Zoom Link: ${course.zoomLink}`)
          }
        />
      ) : (
        <Button
          title="Watch Recorded Video"
          onPress={() =>
            Alert.alert("Playing Video", `Video Link: ${course.video}`)
          }
        />
      )}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6b4f4f",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#6b4f4f",
    textAlign: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
