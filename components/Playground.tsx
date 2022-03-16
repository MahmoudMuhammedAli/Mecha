import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Card from "./Card";
import Cards from "../api/cards";
import { CardsProps } from "../api/cards";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
interface Props {
  opponent?: boolean;
  id?: string | number;
}
const Playground: React.FC<Props> = (Props) => {
  const { opponent, id } = Props;
  const { player1 } = useSelector((state: RootState) => state.game);
  const { player2 } = useSelector((state: RootState) => state.game);
  const ROCard = player2.playCard;
  const playCard = player1.playCard;
  // const findCard = () => {
  //   setPlayCard(Cards.filter((card) => card.id == id)[0]);
  // };
  // useEffect(
  //   () => {
  //     findCard();
  //   },
  //   [ id ]
  // );
  return (
    <View
      style={[
        styles.container,
        { transform: [ { rotate: opponent ? "180deg" : "0deg" } ] },
      ]}
    >
      {opponent ? (
        player2.playCard && (
          <Card
            flipped={player2.playCard.flipped}
            width={135}
            height={190}
            id={parseInt(ROCard.id)}
            type={ROCard.type}
            HP={ROCard.hp}
            attack={ROCard.attack}
            cardName={ROCard.cardname}
          />
        )
      ) : (
        player1.playCard && (
          <Card
            flipped={player1.playCard.flipped}
            width={135}
            height={190}
            id={parseInt(playCard.id)}
            type={playCard.type}
            HP={playCard.hp}
            cardName={playCard.cardname}
            attack={playCard.attack}
          />
        )
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 190,
  },
});

export default Playground;
