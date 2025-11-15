import React from "react";
import styles from "./index.styles";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const handleUploadPress = () => {
    router.push("/upload");
  };
  const handleViewTasksPress = () => {
    router.push("/tasks");
  };

  return (
    <LinearGradient colors={["#F8F0FF", "#F9FAFF"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* top pill */}
        <View style={styles.pill}>
          <Text style={styles.pillText}>AI-Powered Cleaning Assistant</Text>
        </View>

        {/* title + subtitle */}
        <Text style={styles.title}>JANAI</Text>
        <Text style={styles.subtitle}>
          Transform messy photos into organized cleaning tasks.
        </Text>

        {/* feature cards */}
        <View style={styles.cardRow}>
          <View style={styles.featureCard}>
            <View style={styles.iconWrapper}>
              <Ionicons name="camera-outline" size={22} color="#7B68EE" />
            </View>
            <Text style={styles.cardTitle}>Snap a Photo</Text>
            <Text style={styles.cardBody}>
              Take a picture of any mess or cleaning area.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="star-four-points-outline"
                size={22}
                color="#E09B5A"
              />
            </View>
            <Text style={styles.cardTitle}>AI Analysis</Text>
            <Text style={styles.cardBody}>
              Get detailed cleaning instructions instantly.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.iconWrapper}>
              <Feather name="check-circle" size={22} color="#3CBFA4" />
            </View>
            <Text style={styles.cardTitle}>Track Progress</Text>
            <Text style={styles.cardBody}>
              Monitor and complete cleaning tasks.
            </Text>
          </View>
        </View>

        {/* buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleUploadPress}
            activeOpacity={0.8}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={18}
              color="#FFFFFF"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.primaryButtonText}>Upload Mess Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleViewTasksPress}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>View Tasks (0)</Text>
          </TouchableOpacity>
        </View>

        {/* example output */}
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleLabel}>Example Output:</Text>
          <View style={styles.exampleBubble}>
            <Text style={styles.exampleText}>
              “Liquid spill covering 4 sq ft near floor 2 lounge sofa. Requires
              mop + disinfectant. Estimated 5 min cleanup.”
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

