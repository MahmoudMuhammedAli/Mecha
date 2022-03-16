import React, { useEffect, useState } from "react";
import { RootState } from "../redux/store";

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from "react-native";
import { RootTabScreenProps } from "../types";
import Card from "../components/Card";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Loading from "./Loading";
import { CardsProps } from "../api/cards";
import { useDispatch, useSelector } from "react-redux";
import { choose1, choose2, CreateGame } from "../redux/Game";

export default function Game({ navigation }: RootTabScreenProps<"Choose">) {
  const [ chosenCards, setChosenCards ] = useState<CardsProps[]>([]);
  const { allCards } = useSelector((state: RootState) => state.cards);
  const { socket } = useSelector((state: RootState) => state.game);
  const { partner } = useSelector((state: RootState) => state.game);
  const { clientId } = useSelector((state: RootState) => state.game);
  const { cardSet } = useSelector((state: RootState) => state.user);
  const [ cardsLeft, setCardsLeft ] = useState(cardSet);
  const dispatch = useDispatch();
  const handleChoice = (card: CardsProps, id: number) => {
    let newCard = allCards[id - 1];
    setCardsLeft(cardsLeft.filter((item) => item.id !== card.id));

    chosenCards.length < 6 && setChosenCards([ ...chosenCards, newCard ]);
  };

  useEffect(
    () => {
      try {
        if (chosenCards.length >= 6) {
          console.log(partner.socketId, "____________ partner id ");
          if (!partner) {
            alert("opponent disconnected");
            return;
          }
          socket.send(
            JSON.stringify({
              method: "chosen-cards",
              payload: chosenCards,
              clientId,
            })
          );
          dispatch(choose1(chosenCards));
          dispatch(CreateGame());
          navigation.navigate("Game");
        }
      } catch (err) {
        alert("an error occurred - please try again later");
      }
    },
    [ chosenCards ]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[ tw`text-2xl  font-bold text-center mt-10`, styles.title ]}>
        Choose Your Deck
      </Text>
      <Text style={[ tw`  text-gray-200  text-center mb-10 ` ]}>
        {chosenCards.length} out of 6
      </Text>

      <FlatList
        style={{ marginBottom: 150 }}
        numColumns={2}
        keyExtractor={(card) => card.id}
        data={cardsLeft}
        renderItem={(card) => (
          <TouchableOpacity
            style={[ styles.holder ]}
            onPress={() => handleChoice(card.item, parseInt(card.item.id))}
          >
            <Card
              flipped
              width="100%"
              height="100%"
              id={parseInt(card.item.id)}
              type={card.item.type}
              HP={card.item.hp}
              cardName={card.item.cardname}
              attack={card.item.attack}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ce1326",
    minHeight: "100%",
  },
  title: {
    fontSize: 30,
    fontFamily: "space-mono",
    color: "#fcd116",
  },

  holder: {
    width: 170,
    height: 240,
    margin: 10,
  },
  scroll: {
    display: "flex",
    flexDirection: "row",
  },
});

// // Todo make an abstract card component with id, pic_url, flipped
// // todo for performance, once you have the data for the cards render them out in a flatlist component.
// // todo send down a sub array with the chosen cards to the game and render them their again once more using the ids you have
//todo center the items horizontally in the flatlist component.
