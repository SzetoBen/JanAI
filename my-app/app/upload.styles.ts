import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#F8F5FF",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 30,
    color: "#2A2A35",
  },

  uploadBox: {
    borderWidth: 2,
    borderColor: "#D6C9FF",
    borderStyle: "dashed",
    borderRadius: 20,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 30,
    marginTop: 20,
  },

  uploadText: {
    marginTop: 12,
    color: "#6F737C",
    fontSize: 14,
  },

  imagePreview: {
    width: "90%",
    height: 280,
    borderRadius: 16,
    marginBottom: 12,
  },

  changePhotoText: {
    color: "#6F737C",
    fontSize: 15,
    marginTop: 6,
  },

  analyzeButton: {
    backgroundColor: "#A78BFA",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  analyzeButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  backButton: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 15,
  },

  backText: {
  marginLeft: 4,
  fontSize: 16,
  color: "#4A4A58",
  fontWeight: "500",
 },

  optionsContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },

  optionButton: {
    backgroundColor: "#A78BFA",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    marginTop: 12,
  },

  optionButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  cancelButton: {
    backgroundColor: "#9CA3AF",
  },

  input: {
  width: "100%",
  backgroundColor: "#FFF",
  borderRadius: 12,
  padding: 14,
  marginTop: 14,
  borderWidth: 1,
  borderColor: "#E2D8FF",
  fontSize: 16,
  color: "#242528ff"
  },

});
