import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import api from "../../api/api";

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

export default function ListUser() {
  const [user, setUser] = useState<UserData[]>([]);
  const getUser = async () => {
    const res = await api.get("/users");
    setUser(res.data.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Daftar User</Text>

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
            <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>Dibuat: {new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
