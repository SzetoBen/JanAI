import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./upload.styles";
import { useTasks } from "./taskStore";

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null);
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

  // create task
  const handleAnalyze = () => {
    if (!image) return;

    // replace with real API later
    const aiSeverity = 3;
    const aiTitle = "Detected Mess Area";
    const aiSummary =
      "Clutter detected. Recommended cleaning: wipe surfaces, remove trash, and disinfect the area.";

    addTask({
      id: Date.now().toString(),
      image,
      severity: aiSeverity,
      title: aiTitle,
      summary: aiSummary,
    });

    router.replace("/tasks");
  };

  return (
    <View style={styles.container}>
      
      {/* back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
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
          style={styles.analyzeButton}
          onPress={handleAnalyze}
          activeOpacity={0.8}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={18}
            color="#FFF"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.analyzeButtonText}>Analyze & Create Task</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
