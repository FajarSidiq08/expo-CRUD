import { View, StyleSheet, TouchableOpacity, Text, Modal, Pressable } from "react-native";
import ListRole from "../role/listRole";
import CreateRole from "../role/createRole";
import { useState, useEffect } from "react";
import PullToRefresh from "@/components/pullToRefresh";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { fetchRole } from "@/state/roleSlice";

export default function RolesTab() {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const handleRefresh = async () => {
    await dispatch(fetchRole()).unwrap();
  };

  useEffect(() => {
    dispatch(fetchRole());
  }, []);

  return (
    <View style={styles.container}>
      <PullToRefresh onRefresh={handleRefresh}>
        <ListRole />
      </PullToRefresh>

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
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer} onPress={() => { }}>
            <CreateRole
              closeModal={() => setModalVisible(false)}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
