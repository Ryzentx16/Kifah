// AdminPanelScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import UsersManager from "./../shared/UsersManager";

export default function AdminPanelScreen() {
  const [users, setUsers] = useState(UsersManager.getUsers());
  const [newUser, setNewUser] = useState({
    name: "",
    role: "student",
    email: "",
    password: "",
  });

  const handleCreateUser = () => {
    if (
      !newUser.name.trim() ||
      !newUser.email.trim() ||
      !newUser.password.trim()
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    UsersManager.addUser(
      newUser.name,
      newUser.role,
      newUser.email,
      newUser.password
    );
    setUsers(UsersManager.getUsers());
    setNewUser({ name: "", role: "student", email: "", password: "" });
    Alert.alert("Success", "User created successfully.");
  };

  const handleDeleteUser = (id) => {
    UsersManager.deleteUser(id);
    setUsers(UsersManager.getUsers());
    Alert.alert("Success", "User deleted successfully.");
  };

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <Text>{`${item.name} (${item.role}) - ${item.email}`}</Text>
      <Button title="Delete" onPress={() => handleDeleteUser(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      {/* Create User Section */}
      <Text style={styles.subtitle}>Create User</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter user name"
        value={newUser.name}
        onChangeText={(text) => setNewUser({ ...newUser, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter user email"
        value={newUser.email}
        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter user password"
        value={newUser.password}
        onChangeText={(text) => setNewUser({ ...newUser, password: text })}
        secureTextEntry
      />
      <Text style={styles.subtitle}>Select Role</Text>
      <Picker
        selectedValue={newUser.role}
        onValueChange={(itemValue) =>
          setNewUser({ ...newUser, role: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Teacher" value="teacher" />
      </Picker>
      <Button title="Create User" onPress={handleCreateUser} />

      {/* Manage Users Section */}
      <Text style={styles.subtitle}>Manage Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
        contentContainerStyle={styles.list}
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#6b4f4f",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
  },
  list: {
    marginVertical: 10,
  },
  userItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
