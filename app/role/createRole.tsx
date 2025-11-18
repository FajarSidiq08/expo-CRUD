import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import api from "../../api/api";

interface CreateRoleProps {
  closeModal: () => void;
  onCreate: () => void;
}

export default function CreateRole({ closeModal, onCreate }: CreateRoleProps) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post("/roles", { name });

      console.log(res.data);
      onCreate();
      closeModal();
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Role</Text>
      <Text style={styles.label}>Nama Role</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Masukkan nama role"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },

  button: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
