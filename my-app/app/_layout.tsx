import { Stack } from "expo-router";
import { TaskProvider } from "./taskStore";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TaskProvider>
  );
}
