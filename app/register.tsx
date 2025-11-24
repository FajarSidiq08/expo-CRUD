import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { register } from "../state/authSlice";
import { router } from "expo-router";
import { AppDispatch } from "@/state/store";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const result = await dispatch(register(form));

    if (register.fulfilled.match(result)) {
      router.replace("/login"); // pindah ke login setelah sukses
    } else {
      alert("Gagal register");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Register</Text>

      <Text>Nama</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
        }}
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
      />

      <Text>Email</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
        }}
        value={form.email}
        onChangeText={(v) => setForm({ ...form, email: v })}
      />

      <Text>Password</Text>
      <TextInput
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
        }}
        value={form.password}
        onChangeText={(v) => setForm({ ...form, password: v })}
      />

      <Button title="Register" onPress={handleRegister} />

      <View style={{ marginTop: 10 }}>
        <Button title="Go to Login" onPress={() => router.push("/login")} />
      </View>
    </View>
  );
}
