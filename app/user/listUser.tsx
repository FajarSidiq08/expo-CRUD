import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import api from "../../api/api";
import UpdateUser from "./updateUser";
import { Feather } from '@expo/vector-icons';

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
            style={styles.card}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.name} ({item.role.name})
              </Text>
              <Text>{item.email}</Text>

              <Text style={{ fontSize: 12, color: "gray", marginTop: 4 }}>
                Dibuat: {new Date(item.created_at).toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginLeft: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => openEdit(item)}
                style={{
                  backgroundColor: "#007bff",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Feather name="edit" size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteUser(item.id)}
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 8,
                }}
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
        onUpdate={getUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
})