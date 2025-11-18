import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRole } from "@/state/roleSlice";
import { AppDispatch } from "@/state/store";

export default function UpdateRole({ visible, role, onClose }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role) {
      setName(role.name);
    }
  }, [role]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      alert("Nama wajib diisi");
      return;
    }

    setLoading(true);

    const result = await dispatch(
      updateRole({
        id: role.id,
        name,
      })
    );

    setLoading(false);

    if (updateRole.fulfilled.match(result)) {
      onClose();
    } else {
      alert("Gagal mengupdate role");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Update Role</Text>

          <Text style={styles.label}>Nama Role</Text>
          <TextInput
            placeholder="Nama"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <>
              <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdate}>
                <Text style={styles.btnText}>Simpan</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
                <Text style={styles.btnText}>Batal</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  label: { marginBottom: 5, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  btnUpdate: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancel: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
