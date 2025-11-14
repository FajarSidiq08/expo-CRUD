import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import ListUser from "./user/listUser";
import React, { useState } from "react";
import CreateUser from "./user/createUser";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const getUser = () => {
    console.log("User berhasil dibuat");
    setReloadKey(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <ListUser reloadKey={reloadKey} />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer} onPress={() => { }}>
            <CreateUser
              closeModal={() => setModalVisible(false)}
              onCreate={getUser}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
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
