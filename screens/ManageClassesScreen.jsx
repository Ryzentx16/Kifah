// ManageClassesScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ClassManager from "./../shared/ClassManager";

export default function ManageClassesScreen() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    setClasses(ClassManager.getClasses());
  }, []);

  const addClass = () => {
    if (!newClass.trim()) {
      Alert.alert("Error", "Class name cannot be empty.");
      return;
    }

    const combinedDateTime = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      newTime.getHours(),
      newTime.getMinutes()
    );

    ClassManager.addClass(newClass, combinedDateTime.toISOString());
    setClasses([...ClassManager.getClasses()]);
    setNewClass("");
    setNewDate(new Date());
    setNewTime(new Date());
  };

  const deleteClass = (id) => {
    ClassManager.deleteClass(id);
    setClasses([...ClassManager.getClasses()]);
  };

  const renderClass = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.classTitle}>{item.title}</Text>
      <Text style={styles.classTime}>
        {new Date(item.time).toLocaleString()}
      </Text>
      <Button title="Delete" onPress={() => deleteClass(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Classes</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={renderClass}
        contentContainerStyle={styles.classList}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new class name"
        value={newClass}
        onChangeText={setNewClass}
      />
      <Button title="Set Class Date" onPress={() => setShowDatePicker(true)} />
      <Text style={styles.selectedValue}>
        Selected Date: {newDate.toLocaleDateString()}
      </Text>
      {showDatePicker && (
        <DateTimePicker
          value={newDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setNewDate(selectedDate);
            }
          }}
        />
      )}
      <Button title="Set Class Time" onPress={() => setShowTimePicker(true)} />
      <Text style={styles.selectedValue}>
        Selected Time:{" "}
        {newTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Text>
      {showTimePicker && (
        <DateTimePicker
          value={newTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setNewTime(selectedTime);
            }
          }}
        />
      )}
      <Button title="Add Class" onPress={addClass} />
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
    marginBottom: 20,
  },
  classItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "column",
  },
  classTitle: {
    fontSize: 18,
    color: "#6b4f4f",
    marginBottom: 5,
  },
  classTime: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  selectedValue: {
    fontSize: 16,
    color: "#6b4f4f",
    marginVertical: 10,
  },
});
