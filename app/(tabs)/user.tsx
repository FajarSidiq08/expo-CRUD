import PullToRefresh from "@/components/pullToRefresh";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreateUser from "../user/createUser";
import ListUser from "../user/listUser";

export default function UserTab() {
    const [modalVisible, setModalVisible] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const getUser = () => {
        setReloadKey(prev => prev + 1);
    };

    const refreshData = async () => {
        console.log("Refreshed!");
        getUser();
    };

    return (
        <View style={{ flex: 1 }} >
            <PullToRefresh onRefresh={refreshData}>
                <ListUser reloadKey={reloadKey} />
            </PullToRefresh >

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
                    <Pressable style={styles.modalContainer}
                        onPress={() => { }}
                    >
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
