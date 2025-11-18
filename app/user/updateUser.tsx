import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/state/userSlice";
import { AppDispatch } from "@/state/store";
import api from "../../api/api";

export default function UpdateUser({ visible, user, onClose }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await api.get("/roles");
      setRoles(res.data.data);
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRoleId(user.role_id);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!name || !email || !roleId) {
      alert("Data tidak boleh kosong");
      return;
    }

    setLoading(true);

    await dispatch(
      updateUser({
        id: user.id,
        name,
        email,
        role_id: roleId,
      })
    );

    setLoading(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Update User</Text>

          <Text style={styles.label}>Nama</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Role</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={roleId} onValueChange={setRoleId}>
              {roles.map((role: any) => (
                <Picker.Item key={role.id} label={role.name} value={role.id} />
              ))}
            </Picker>
          </View>

          {loading ? (
            <ActivityIndicator size="large" />
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
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "85%", backgroundColor: "white", padding: 20, borderRadius: 12 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  label: { marginTop: 10, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 5 },
  pickerWrapper: { borderWidth: 1, borderRadius: 8, borderColor: "#ccc", marginTop: 10 },
  btnUpdate: { marginTop: 20, backgroundColor: "green", padding: 12, borderRadius: 8, alignItems: "center" },
  btnCancel: { marginTop: 10, backgroundColor: "red", padding: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "white", fontWeight: "bold" },
});
