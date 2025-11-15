import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./upload.styles";
import { useTasks } from "./taskStore";
import { getApiConfig } from "../config/environment";
import { TextInput } from "react-native";

const API_BASE_URL = getApiConfig().BASE_URL;

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [building, setBuilding] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const router = useRouter();
  const { addTask } = useTasks();

  // Request camera permission
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to take photos."
      );
      return false;
    }
    return true;
  };

  // Request media library permission
  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Media library permission is required to select photos."
      );
      return false;
    }
    return true;
  };

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setShowPhotoOptions(false);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Failed to open camera");
    }
  };

  // Pick image from camera roll
  const pickImage = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setShowPhotoOptions(false);
      }
    } catch (error) {
      console.error("Gallery error:", error);
      Alert.alert("Error", "Failed to open gallery");
    }
  };

  // Show photo options modal
  const handlePhotoButtonPress = () => {
    setShowPhotoOptions(true);
  };

  // Convert image to base64
  const imageToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remove the 'data:image/...;base64,' prefix
        resolve(base64.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Send image to backend API
  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    try {
      // Convert image to base64
      const base64Image = await imageToBase64(image);

      // Send to backend
      const response = await fetch(`${API_BASE_URL}/api/analyze-image-base64`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze image");
      }

      const result = await response.json();

      // Add task with API response
      addTask({
        id: Date.now().toString(),
        image,
        severity: result.severity,
        title: result.title,
        summary: result.summary,
        building,
        roomNumber,
      });

      router.replace("/tasks");
    } catch (error) {
      console.error("Error analyzing image:", error);
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to analyze image.\n\nMake sure:\n1. Backend is running: .\start-backend.ps1\n2. On PORT 5000\n3. Update API_BASE_URL if needed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        disabled={loading}
      >
        <Ionicons name="chevron-back" size={20} color="#4A4A58" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* page title */}
      <Text style={styles.title}>Upload Mess Photo</Text>
      {/* Building Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Building"
        placeholderTextColor="#4A4A58"
        value={building}
        onChangeText={setBuilding}
      />

      {/* Room Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Room Number"
        placeholderTextColor="#4A4A58"
        value={roomNumber}
        onChangeText={setRoomNumber}
      />
      
      {/* upload box */}
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={handlePhotoButtonPress}
        activeOpacity={0.8}
        disabled={loading || showPhotoOptions}
      >
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <Text style={styles.changePhotoText}>Click to change photo</Text>
          </>
        ) : (
          <>
            <Ionicons name="camera-outline" size={50} color="#A78BFA" />
            <Text style={styles.uploadText}>Click to take or select a photo</Text>
          </>
        )}
      </TouchableOpacity>

      {/* photo options buttons */}
      {showPhotoOptions && !image && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={takePhoto}
            disabled={loading}
          >
            <Ionicons name="camera" size={24} color="#FFFFFF" />
            <Text style={styles.optionButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={pickImage}
            disabled={loading}
          >
            <Ionicons name="images" size={24} color="#FFFFFF" />
            <Text style={styles.optionButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.cancelButton]}
            onPress={() => setShowPhotoOptions(false)}
            disabled={loading}
          >
            <Ionicons name="close" size={24} color="#FFFFFF" />
            <Text style={styles.optionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* analyze button */}
      {image && (
        <TouchableOpacity
          style={[styles.analyzeButton, loading && { opacity: 0.6 }]}
          onPress={handleAnalyze}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.analyzeButtonText}>Analyzing...</Text>
            </>
          ) : (
            <>
              <Ionicons
                name="cloud-upload-outline"
                size={18}
                color="#FFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.analyzeButtonText}>Analyze & Create Task</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
