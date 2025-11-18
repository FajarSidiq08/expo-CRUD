import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import UpdateRole from './updateRole';

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import { fetchRole, deleteRole } from "@/state/roleSlice";

export default function ListRole() {
  const dispatch = useDispatch<AppDispatch>();

  const { list, loading } = useSelector((state: RootState) => state.role);

  const [editVisible, setEditVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchRole());
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      "Konfirmasi",
      "Yakin ingin menghapus role ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            dispatch(deleteRole(id));
          },
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
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Role</Text>

      <FlatList
        data={list}
        keyExtractor={(item: any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.roleId}>#{item.id}</Text>
            <Text style={styles.roleName}>{item.name}</Text>

            <TouchableOpacity
              onPress={() => {
                setSelectedRole(item);
                setEditVisible(true);
              }}
              style={{
                backgroundColor: "#007bff",
                padding: 10,
                borderRadius: 8,
                marginLeft: 'auto',
              }}
            >
              <Feather name="edit" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 8,
                marginLeft: 10,
              }}
            >
              <Feather name="trash-2" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />

      <UpdateRole
        visible={editVisible}
        role={selectedRole}
        onClose={() => setEditVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },
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
  roleId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    marginRight: 10,
    width: 40,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
