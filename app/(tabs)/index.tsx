// app/index.tsx
import { Button } from "@react-navigation/elements";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Selamat datang di aplikasi!</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Kembali ke Login" onPress={() => router.push("/login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
