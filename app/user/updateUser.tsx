import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { Picker } from "@react-native-picker/picker";

interface UpdateUserProps {
  visible: boolean;
  user: any;
  onClose: () => void;
  onUpdate: () => void;
}

export default function UpdateUser({ visible, user, onClose, onUpdate }: UpdateUserProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        setRoles(res.data.data);
      } catch (error) {
        console.log("Error get roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRoleId(user.role_id)
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!name || !email || !roleId) {
      alert("Name dan Email wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/users", {
        id: user.id,
        name,
        email,
        role_id: roleId,
      });

      if (response.data.status === 200) {
        onUpdate();
        onClose();
      } else {
        alert(response.data.message || "Terjadi kesalahan");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat update user");
    }

    setLoading(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Update User</Text>

          <Text style={styles.label}>Nama</Text>
          <TextInput
            placeholder="Nama"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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
  label: { marginBottom: 5, fontWeight: "600" },
    pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
});
