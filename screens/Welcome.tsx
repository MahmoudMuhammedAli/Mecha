import React from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { RootTabScreenProps } from "../types";

export default function Welcome({ navigation }: RootTabScreenProps<"Welcome">) {
  return (
    <GestureRecognizer
      onSwipeUp={() => {
        navigation.navigate("LoginEmail");
        Vibration.vibrate();
      }}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to PokeGame!</Text>
      <Text style={styles.bottom}>Swipe up to get started</Text>
    </GestureRecognizer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ce1326",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "space-mono",
    color: "#fcd116",
  },
  bottom: {
    position: "absolute",
    bottom: 10,
    color: "#f5d85a",
  },
});
