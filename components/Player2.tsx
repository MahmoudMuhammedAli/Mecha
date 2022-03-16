import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import Deck from "./Deck";
import Playground from "./Playground";
import { CardsProps } from "../api/cards";
import { useSelector } from "react-redux";
import Info from "./Info";
import { RootState } from "../redux/store";
import GameAction from "./GameAction";

export default function Player2() {
  const { player1 } = useSelector((state: RootState) => state.game);
  const { turn } = useSelector((state: RootState) => state.game);
  const { gameActions } = useSelector((state: RootState) => state.game);

  return (
    <View
      style={[
        tw` w-full flex  items-center`,
        styles.player2,
        { backgroundColor: player1.turn ? "#ED5564" : "#fff" },
      ]}
    >
      <View style={[ styles.playground ]}>
        <Playground />
      </View>
      <View style={[ styles.deck ]}>
        <Deck />
      </View>
      <Info player={1} name={player1.name} points={player1.points} />
      {gameActions && <GameAction action="Attack" />}
    </View>
  );
}
const styles = StyleSheet.create({
  player2: {
    borderTopWidth: 6,
    borderTopColor: "#434A54",
    position: "relative",
    height: "50%",
  },
  deck: {
    position: "absolute",
    bottom: -20,
    left: 20,
  },
  playground: {
    marginTop: 40,
  },
});
