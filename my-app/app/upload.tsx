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

const API_BASE_URL = getApiConfig().BASE_URL;

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addTask } = useTasks();

  // pick image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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

      {/* upload box */}
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={pickImage}
        activeOpacity={0.8}
        disabled={loading}
      >
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <Text style={styles.changePhotoText}>Click to change photo</Text>
          </>
        ) : (
          <>
            <Ionicons name="camera-outline" size={50} color="#A78BFA" />
            <Text style={styles.uploadText}>Click to capture or select a photo</Text>
          </>
        )}
      </TouchableOpacity>

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
