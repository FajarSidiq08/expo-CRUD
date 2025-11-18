import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { createUser } from "@/state/userSlice";

interface CreateUserProps {
  closeModal: () => void;
}

export default function CreateUser({ closeModal }: CreateUserProps) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        setRoles(res.data.data);
      } catch (error) {
        console.log("Error get roles:", error);
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async () => {
    const data = {
      name,
      email,
      role_id: roleId,
    };

    const result = await dispatch(createUser(data));

    if (createUser.fulfilled.match(result)) {
      closeModal(); // sukses → tutup modal
    } else {
      alert("Gagal membuat user");
    }
  };

  if (loadingRoles) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah User</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nama"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <Text style={styles.label}>Role</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={roleId}
          onValueChange={(itemValue) => setRoleId(itemValue)}
        >
          <Picker.Item label="Pilih Role" value={0} />
          {roles.map((role: any) => (
            <Picker.Item key={role.id} label={role.name} value={role.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Create</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginBottom: 5, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
