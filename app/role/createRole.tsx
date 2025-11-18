import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { createRole } from "@/state/roleSlice";

interface CreateRoleProps {
  closeModal: () => void;
}

export default function CreateRole({ closeModal }: CreateRoleProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const data = { name };

    const result = await dispatch(createRole(data));

    if (createRole.fulfilled.match(result)) {
      closeModal();
    } else {
      alert("Gagal membuat role");
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
  container: { padding: 20 },

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
