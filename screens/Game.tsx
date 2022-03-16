import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { RootTabScreenProps } from "../types";
import tw from "tailwind-react-native-classnames";
import { transform } from "@babel/core";
import { StatusBar } from "expo-status-bar";
import Player2 from "../components/Player2";
import Player1 from "../components/Player1";
import Cards from "../api/cards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  CreateGame,
  disableGameActions,
  flip1,
  flip2,
  setGameActions,
} from "../redux/Game";
export default function Game({
  route,
  navigation,
}: RootTabScreenProps<"Game">) {
  const { player1 } = useSelector((state: RootState) => state.game);
  const { player2 } = useSelector((state: RootState) => state.game);
  const { socket } = useSelector((state: RootState) => state.game);
  const { clientId } = useSelector((state: RootState) => state.game);
  const { placeholder } = useSelector((state: RootState) => state.game);
  const { turn } = useSelector((state: RootState) => state.game);
  const { gameActions } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  //todo pick card done in deck.tsx
  //todo flip card
  const flipCard = () => {
    //if player1.playCard is true and player2.playCard is true then set gameActions to true and flip both players cards
    //   add that: && player2.playCard !== placeholder
    if (
      player1.playCard !== placeholder &&
      player2.playCard !== placeholder &&
      player1.turn
    ) {
      dispatch(setGameActions());
      console.log("game  actions are on!!!!");
      // dispatch(flip1());
      // dispatch(flip2());
    } else {
      dispatch(disableGameActions());
      console.log("game  actions are off!!!!");
    }
  };

  const win1 = () => {
    Alert.alert("Player 1 Wins");
  };
  const win2 = () => {
    Alert.alert("Player 2 Wins");
  };
  const endGame = () => {
    socket.send(
      JSON.stringify({
        method: "end-game",
        clientId,
      })
    );
    socket.on("game-ended", () => {
      socket.disconnect();
      dispatch(CreateGame());
      navigation.navigate("Play");
    });
  };

  useEffect(
    () => {
      flipCard();
      if (player1.points >= 6) {
        win1();
        endGame();
      }
      if (player2.points >= 6) {
        win2();
        endGame();
      }
    },
    [ player1, player2 ]
  );
  return (
    <View
      style={[
        tw`h-full flex flex-col `,
        { backgroundColor: player2.turn ? "#ED5564" : "#fff" },
      ]}
    >
      <Player1 />
      <Image
        style={[
          styles.logo,

          {
            transform: player1.turn
              ? [
                  { rotate: `${0}deg` },
                  { translateX: -35 },
                  { translateY: -32 },
                ]
              : [
                  { rotate: `${180}deg` },
                  { translateX: 35 },
                  { translateY: 32 },
                ],
          },
        ]}
        source={require("../assets/images/pokeball.png")}
      />
      <Player2 />
      <StatusBar hidden />
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    position: "absolute",
    top: "50%",
    left: "50%",

    zIndex: 99,
  },
});
