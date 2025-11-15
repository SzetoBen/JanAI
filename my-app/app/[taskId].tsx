import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTasks } from "./taskStore";
import styles from "./[taskId].styles";
import { Ionicons } from "@expo/vector-icons";

export default function TaskDetailScreen() {
  const router = useRouter();
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { tasks, removeTask } = useTasks();

  // Find the task
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#4A4A58" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  const handleMarkComplete = () => {
    removeTask(task.id);
    router.back();
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return "#DC2626"; // Red
    if (severity >= 5) return "#F97316"; // Orange
    return "#22C55E"; // Green
  };

  const getSeverityLabel = (severity: number) => {
    if (severity >= 8) return "High Priority";
    if (severity >= 5) return "Medium Priority";
    return "Low Priority";
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={24} color="#4A4A58" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Full Image */}
      <Image source={{ uri: task.image }} style={styles.fullImage} />

      {/* Severity Badge */}
      <View
        style={[
          styles.severityBadge,
          { backgroundColor: getSeverityColor(task.severity) },
        ]}
      >
        <Text style={styles.severityBadgeText}>
          {getSeverityLabel(task.severity)}
        </Text>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        {/* Title */}
        <Text style={styles.title}>{task.title}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.infoRow}>
            <Ionicons name="home" size={20} color="#A78BFA" />
            <Text style={styles.infoLabel}>Building:</Text>
            <Text style={styles.infoValue}>{task.building}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="square" size={20} color="#A78BFA" />
            <Text style={styles.infoLabel}>Room:</Text>
            <Text style={styles.infoValue}>{task.roomNumber}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Severity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Severity</Text>
          <View style={styles.severityContainer}>
            <View style={styles.severityBar}>
              <View
                style={[
                  styles.severityFill,
                  {
                    width: `${(task.severity / 10) * 100}%`,
                    backgroundColor: getSeverityColor(task.severity),
                  },
                ]}
              />
            </View>
            <Text style={styles.severityNumber}>{task.severity}/10</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Description</Text>
          <Text style={styles.summary}>{task.summary}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleMarkComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleMarkComplete}
          >
            <Ionicons name="trash" size={20} color="#FFFFFF" />
            <Text style={styles.deleteButtonText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
