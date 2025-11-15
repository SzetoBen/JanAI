import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "./taskStore";
import styles from "./tasks.styles";
import { Ionicons } from "@expo/vector-icons";

export default function TasksScreen() {
    const router = useRouter();
    const { tasks, removeTask } = useTasks();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.dismiss()}
                style={styles.backButton}
            >
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.title}>Cleaning Tasks</Text>
            <Text style={styles.subtitle}>{tasks.length} pending tasks</Text>

            {/* Empty State */}
            {tasks.length === 0 ? (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyTitle}>No tasks yet</Text>
                    <Text style={styles.emptyDescription}>
                        Upload a mess photo to create your first task.
                    </Text>
                </View>
            ) : (
                tasks.map((task) => (
                    <View key={task.id} style={styles.taskCard}>

                        {/* Task Image */}
                        <Image source={{ uri: task.image }} style={styles.taskImage} />

                        {/* Info */}
                        <View style={styles.taskInfo}>
                            <Text style={styles.taskTitle}>{task.title}</Text>

                            <Text style={styles.taskSeverity}>
                                Severity: {task.severity}
                            </Text>

                            <Text style={styles.taskSummary}>{task.summary}</Text>
                        </View>

                        {/* Checkmark Button (Delete Task) */}
                        <TouchableOpacity
                            onPress={() => removeTask(task.id)}
                            style={styles.checkButton}
                        >
                            <Ionicons
                                name="ellipse-outline"
                                size={32}
                                color="#9CA3AF"   // gray icon when unchecked
                            />
                        </TouchableOpacity>
                    </View>
                ))
            )}
        </ScrollView>
    );
}
