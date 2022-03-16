import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  attack1,
  attack2,
  changeTurn,
  destroy1,
  destroy2,
} from "../redux/Game";
import { RootState } from "../redux/store";
import Player1 from "./Player1";
interface Props {
  action: string;
  disabled?: boolean;
}

const GameAction: React.FC<Props> = (props) => {
  const { player1 } = useSelector((state: RootState) => state.game);
  const { player2 } = useSelector((state: RootState) => state.game);
  const { socket } = useSelector((state: RootState) => state.game);
  const { turn } = useSelector((state: RootState) => state.game);
  const { clientId } = useSelector((state: RootState) => state.game);

  const dispatch = useDispatch();
  const { action } = props;

  const endTurn = () => {
    socket.send(
      JSON.stringify({
        method: "turn",
        clientId,
      })
    );
    dispatch(changeTurn());
  };

  const attacked = () => {
    //toss a coin to see if the attack is successful

    if (Math.random() > 0.2) {
      //successful attack
      socket.send(
        JSON.stringify({
          method: "attack",
          payload: player1.playCard.attack,
          clientId,
        })
      );
      dispatch(attack2(player1.playCard.attack));

      if (player2.playCard.hp <= 0) {
        // socket.send(
        //   JSON.stringify({
        //     method: "destroy",

        //     clientId,
        //   })
        // );
        // dispatch(destroy2());
        endTurn();
        Toast.showWithGravity(
          "You destroyed the opponent's card",
          Toast.SHORT,
          Toast.TOP
        );
      } else {
        // just a successful attack
       }
    } else {
      socket.send(
        JSON.stringify({
          method: "attack",
          payload: 0,
          clientId,
        })
      );
      endTurn();
      Toast.showWithGravity(
        "Attack Failed - Better luck next time",
        Toast.LONG,
        Toast.TOP
      );
    }

    //TODO: change turn
  };
  return (
    <>

      {player1.turn &&
      player1.playCard.attack > 0 && (
        <View
        style={tw`absolute  right-5  top-28  px-4 py-1 mt-3 bg-red-800 text-center rounded border-yellow-300 border-2`}
      >
        <TouchableOpacity
          onPress={() => {
            attacked();
          }}
        >
          <Text style={tw`text-yellow-300 text-base font-bold`}>{action}</Text>
        </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default GameAction;

//? old attack with socket io
/*
  socket.send(
        JSON.stringify({
          method: "attack",
          payload: player1.playCard.attack,
          clientId,
        })
      );
      dispatch(attack2(player1.playCard.attack));
      socket.on("opponent-attack", (attack: number) => {
        console.log("opponent-attack", attack);
        dispatch(attack1(attack));
        endTurn();
      });
      if (player2.playCard.hp <= 0) {
        socket.emit("destroy");
        dispatch(destroy2());
        socket.on("opponent-destroy", () => {
          console.log("opponent-destroy");
          dispatch(destroy1());
        });
        Toast.showWithGravity(
          "You destroyed the opponent's card",
          Toast.SHORT,
          Toast.TOP
        );
      } else {
        Toast.showWithGravity("Attacked successfully!", Toast.SHORT, Toast.TOP);
      }
    } else {
      socket.emit("attack", 0);
      endTurn();
      Toast.showWithGravity(
        "Attack Failed - Better luck next time",
        Toast.LONG,
        Toast.TOP
      ); */
