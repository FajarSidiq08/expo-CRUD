import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import { router } from "expo-router";
import { AppDispatch } from "@/state/store";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await dispatch(login({ email, password }));
    console.log("RESULT:", result);

    if (login.fulfilled.match(result)) {
      router.replace("/");
    } else {
      alert("Gagal login");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login</Text>

      <Text>Email</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
        }}
        value={email}
        onChangeText={setEmail}
      />

      <Text>Password</Text>
      <TextInput
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
        }}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Go to Register"
          onPress={() => router.push("/register")}
        />
      </View>
    </View>
  );
}
