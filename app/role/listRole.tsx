import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import api from '@/api/api';
import UpdateRole from './updateRole';

interface Role {
  id: number;
  name: string;
}

interface ListRoleProps {
  reloadKey: number;
}

export default function ListRole({ reloadKey }: ListRoleProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const getRole = async () => {
    try {
      const res = await api.get('/roles');
      setRoles(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRole = (id: number) => {
    Alert.alert(
      "Konfirmasi",
      "Yakin ingin menghapus role ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/roles/${id}`);
              getRole();
            } catch (error) {
              Alert.alert("Error", "Gagal menghapus user");
              console.log("Delete error:", error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    getRole();
  }, [reloadKey]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Role</Text>

      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
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
              onPress={() => deleteRole(item.id)}
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
        onUpdate={getRole}
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

  iconWrapper: {
    marginLeft: 'auto',
    padding: 6,
  },
});
