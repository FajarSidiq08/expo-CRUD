import PullToRefresh from "@/components/pullToRefresh";
import React, { useState, useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreateUser from "../user/createUser";
import ListUser from "../user/listUser";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { fetchUsers } from "@/state/userSlice";

export default function UserTab() {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleRefresh = async () => {
    await dispatch(fetchUsers()).unwrap();
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PullToRefresh onRefresh={handleRefresh}>
        <ListUser />
      </PullToRefresh>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="slide">
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer} onPress={() => { }}>
            <CreateUser closeModal={() => setModalVisible(false)} />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
});
