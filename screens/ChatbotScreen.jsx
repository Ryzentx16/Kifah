// ChatbotScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import OpenAI from "openai";
// import { OPENAI_API_KEY } from "@env";
// import OPENAI_API_KEY from "./../config";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem("chatHistory");
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };

    loadChatHistory();
  }, []);

  useEffect(() => {
    const saveChatHistory = async () => {
      try {
        await AsyncStorage.setItem("chatHistory", JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat history:", error);
      }
    };

    if (messages.length > 0) {
      saveChatHistory();
    }
  }, [messages]);

  const handleSend = async () => {
    if (isSending) {
      alert("Please wait before sending another message.");
      return;
    }
    if (!input.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setIsSending(true);
    setIsTyping(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful and knowledgeable teacher. Only answer questions related to teaching, learning, and academic subjects. Politely decline to answer unrelated queries.",
          },
          { role: "user", content: userMessage.text },
        ],
      });

      const botMessage = {
        id: Date.now().toString(),
        text: completion.choices[0]?.message?.content || "No response.",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "An error occurred while communicating with the AI. Please try again later.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={24} color="#6b4f4f" />
      </TouchableOpacity> */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#6b4f4f" />
          <Text style={styles.typingText}>AI is typing...</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={handleSend} disabled={isSending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f1e7",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d4a373",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  typingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#6b4f4f",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});
