import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Alert } from "react-native";
import api from "../../api/api";
import UpdateUser from "./updateUser";

interface Role {
  id: number;
  name: string;
}

interface UserData {
  id: number;
  role_id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  role: Role;
}

interface ListUserProps {
  reloadKey: number;
}

export default function ListUser({ reloadKey }: ListUserProps) {
  const [user, setUser] = useState<UserData[]>([]);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const getUser = async () => {
    try {
      const res = await api.get("/users");
      setUser(res.data.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, [reloadKey]);

  const openEdit = (item: UserData) => {
    setSelectedUser(item);
    setEditVisible(true);
  };

  const deleteUser = (id: number) => {
    Alert.alert(
      "Konfirmasi",
      "Yakin ingin menghapus user ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/users/${id}`);
              getUser();
            } catch (error) {
              Alert.alert("Error", "Gagal menghapus user");
              console.log("Delete error:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Daftar User
      </Text>

      <FlatList
        data={user}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.name} ({item.role.name})
            </Text>
            <Text>{item.email}</Text>

            <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              Dibuat: {new Date(item.created_at).toLocaleString()}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => openEdit(item)}
                style={{
                  flex: 1,
                  backgroundColor: "#007bff",
                  padding: 8,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteUser(item.id)}
                style={{
                  flex: 1,
                  backgroundColor: "red",
                  padding: 8,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <UpdateUser
        visible={editVisible}
        user={selectedUser}
        onClose={() => setEditVisible(false)}
        onUpdate={getUser}
      />
    </View>
  );
}
