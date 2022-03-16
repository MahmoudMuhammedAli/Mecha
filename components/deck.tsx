import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListRenderItemInfo,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import Cards, { CardsProps } from "../api/cards";
import { RootState } from "../redux/store";
import { changeTurn, pick1, pick2 } from "../redux/Game";
import Card from "./Card";
interface Props {
  opponent?: boolean;
}
const Deck: React.FC<Props> = (Props) => {
  const { opponent } = Props;

  //TODO: placeHolder. GET FROM THE STOR!!!
  const { player1 } = useSelector((state: RootState) => state.game);
  const { turn } = useSelector((state: RootState) => state.game);
  const { player2 } = useSelector((state: RootState) => state.game);
  const { socket } = useSelector((state: RootState) => state.game);
  const { partner } = useSelector((state: RootState) => state.game);
  const { clientId } = useSelector((state: RootState) => state.game);
  const { placeholder } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [ activeChosen, setActiveChosen ] = useState(player1.chosen);
  const endTurn = () => {
    socket.send(
      JSON.stringify({
        method: "turn",
        clientId,
      })
    );
    dispatch(changeTurn());
  };
  const handleChoice = (card: CardsProps, index: number) => {
    // // when you get the players from the db change turn ===1 to turn ===player.id
    if (
      !opponent &&
      player1.turn &&
      (player1.playCard === placeholder || player1.playCard.hp === 0)
    ) {
      try {
        if (!socket) {
          Alert.alert("No connection to server");
          return;
        }
        socket.send(
          JSON.stringify({
            method: "play-card",
            payload: card,
            clientId,
          })
        );
        socket.send(
          JSON.stringify({
            method: "chosen-cards",
            payload: activeChosen,
            clientId,
          })
        );
        console.log("---------sent a play card to", partner.name);
        dispatch(pick1(card));
        endTurn();
      } catch (err) {
        alert("an error occurred - please try again later");
      }

      setActiveChosen(
        activeChosen.filter((item: CardsProps) => item.id !== card.id)
      );
    }
  };
  const whatToRender = () => {
    if (opponent) return player2.chosen;
    else return activeChosen;
  };
  return (
    <View style={tw`flex flex-row `}>
      {whatToRender().map((card, index) => (
        <TouchableOpacity
          key={parseInt(card.id)}
          style={[
            {
              transform: [
                {
                  translateX: index * -50,
                },
                // {
                //   rotate:
                //     index > whatToRender.length / 1
                //       ? `${index - 1 * Math.PI * 5}deg`
                //       : `${-(index - 1 * Math.PI * 5)}deg`,
                // },
              ],
              zIndex: 6 - index,
            },
          ]}
          onPress={() => handleChoice(card, index)}
        >
          <Card
            flipped={!opponent}
            width={100}
            height={136}
            id={parseInt(card.id)}
            type={card.type}
            HP={card.hp}
            cardName={card.cardname}
            attack={card.attack}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  holder: {
    width: 150,
    height: 180,
  },
});
export default Deck;
