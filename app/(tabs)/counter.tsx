import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// --- State Awal ---
interface CounterState {
  counter: number;
}

const initialState: CounterState = {
  counter: 0,
};

// --- Slice ---
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 2;
    },
  },
});

// --- Store ---
const store = configureStore({
  reducer: counterSlice.reducer, 
});

// --- Type Store ---
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// --- Komponen Utama ---
export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// --- Komponen Counter ---
function Counter() {
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter: {counter}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Increment"
          color="#404040ff"
          onPress={() => dispatch(counterSlice.actions.increment())}
        />
        <Button
          title="Decrement"
          color="#404040ff"
          onPress={() => dispatch(counterSlice.actions.decrement())}
        />
      </View>
    </View>
  );
}

// --- Style ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 250,
  },
});
