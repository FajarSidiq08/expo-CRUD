import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import api from "../../api/api";
import { useRouter } from "expo-router"; 

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const handleCreate = async () => {
    if (!name || !email || !password) {
      alert("Semua field wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/users", {
        name,
        email,
        password,
      });

      alert(res.data.message); 

      setName("");
      setEmail("");
      setPassword("");

      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nama</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Button
        title={loading ? "Loading..." : "Create User"}
        onPress={handleCreate}
        disabled={loading}
      />
    </View>
  );
}
