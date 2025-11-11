import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from "../api/api";


export default function User() {
    const [user, setUser] = useState<any[]>([])
    const getUser = async () => {
        const res = await api.get("/users");
        setUser(res.data.data);
    }

    useEffect(() => {
        getUser();
    }, [])

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
              {item.name} ({item.role?.name})
            </Text>
            <Text>{item.email}</Text>
            <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              Dibuat: {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
