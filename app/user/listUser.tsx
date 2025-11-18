import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import { fetchUsers, deleteUser } from "@/state/userSlice";
import UpdateUser from "./updateUser";
import { Feather } from "@expo/vector-icons";

export default function ListUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.user);

  const [editVisible, setEditVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const openEdit = (item: any) => {
    setSelectedUser(item);
    setEditVisible(true);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Konfirmasi",
      "Yakin ingin menghapus user ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          onPress: () => {
            dispatch(deleteUser(id));
          },
          style: "destructive",
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Daftar User
      </Text>

      <FlatList
        data={list}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.name} ({item.role?.name})
              </Text>

              <Text>{item.email}</Text>

              <Text style={{ fontSize: 12, color: "gray", marginTop: 4 }}>
                Dibuat: {new Date(item.created_at).toLocaleString()}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={() => openEdit(item)}
                style={styles.editBtn}
              >
                <Feather name="edit" size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteBtn}
              >
                <Feather name="trash-2" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <UpdateUser
        visible={editVisible}
        user={selectedUser}
        onClose={() => setEditVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 6,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  editBtn: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
});
