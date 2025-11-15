import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    color: "#6B7280",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#3F3F3F",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 20,
  },

  emptyCard: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    borderColor: "#E5D8FF",
    borderWidth: 1,
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  emptyDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    maxWidth: 240,
  },

  taskCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderColor: "#E5D8FF",
    borderWidth: 1,
    gap: 12,
  },

  taskImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },

  taskInfo: {
    flex: 1,
    justifyContent: "center",
  },

  taskTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
    color: "#333",
  },

  taskSeverity: {
    fontSize: 14,
    color: "#8B5CF6", 
    marginBottom: 4,
  },

  taskSummary: {
    fontSize: 14,
    color: "#555",
  },

  checkButton: {
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 8,
  },

});
