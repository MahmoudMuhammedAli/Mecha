import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { RootState } from "../redux/store";
import Deck from "./Deck";
import Info from "./Info";
import Playground from "./Playground";
export default function Player1() {
  const { player2 } = useSelector((state: RootState) => state.game);

  return (
    <View style={[ tw`h-full w-full  flex  items-center`, styles.player1 ]}>
      <View style={[ styles.playground ]}>
        <Playground opponent />
      </View>
      <View style={[ styles.deck ]}>
        <Deck opponent />
      </View>
      <Info player={2} name={player2.name} points={player2.points} />
    </View>
  );
}
const styles = StyleSheet.create({
  player1: {
    borderTopWidth: 6,
    height: "50%",
    position: "relative",
  },
  deck: {
    position: "absolute",
    top: -70,
    left: 20,
  },
  playground: {
    marginTop: 175,
  },
});
