import React, { useState, useEffect } from "react";
import Toast from "react-native-simple-toast";

import {
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
  Image,
  Pressable,
  Vibration,
} from "react-native";

import { Text, View } from "../components/Themed";
import tw from "tailwind-react-native-classnames";
import { TextInput } from "react-native-gesture-handler";
import { RootTabScreenProps } from "../types";
import {
  pickName1,
  setPartner,
  setSocket,
  setClientId,
  setWS,
  choose2,
  changeTurn,
  pick2,
  pickName2,
  attack1,
  destroy1,
  CreateGame,
} from "../redux/Game";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { RootState } from "../redux/store";
import SimpleToast from "react-native-simple-toast";
export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [ loading, setLoading ] = useState(false);
  const [ noName, setNoName ] = useState(false);
  const { player1 } = useSelector((state: RootState) => state.game);
  const [ text, onChangeText ] = useState(player1.name);
  const { token } = useSelector((state: RootState) => state.user);
  const [ localSocket, setLocalSocket ] = useState<any>(
    new WebSocket("ws://obscure-ravine-58334.herokuapp.com/")
  );
  const { socket: globalSocket } = useSelector(
    (state: RootState) => state.game
  );
  const { clientId } = useSelector((state: RootState) => state.game);

  const dispatch = useDispatch();

  const connect = () => {
    if (text.length > 0) {
      dispatch(pickName1(text));
      setNoName(false);
    } else {
      setNoName(true);
      SimpleToast.show("Please enter a name");
    }

    setTimeout(() => {
      !noName && queueME();
    }, 300);
  };
  const queueME = () => {
    if (!clientId) {
      alert("unable to connect to the server ");
      return;
    }
    setLoading(true);
    const name = text;
    localSocket.send(JSON.stringify({ method: "join-me", clientId, name }));
  };

  useEffect(
    () => {
      dispatch(setSocket(localSocket));

      localSocket.onmessage = (message: any) => {
        //message.data
        const response = JSON.parse(message.data);
        if (response.method === "connect") {
          console.log("client id connected successfully", response.clientId);
          console.log("my clientId", response.clientId);
          dispatch(setClientId(response.clientId));
        }
        if (response.method === "message-received") {
          alert(response.payload);
        }
        if (response.method === "opponent-attack") {
          // SimpleToast.show("You've been attacked", Toast.SHORT);
          dispatch(attack1(response.payload));
        }
        if (response.method === "opponent-destroy") {
          SimpleToast.show("You card has been destroyed");
          dispatch(destroy1());
        }
        if (response.method === "joined") {
          console.log("this is an example response ----- \n", response.payload);
          if (
            response.payload.partner.clientId.localeCompare(
              response.payload.partner.partnerClientId
            ) === 1
          ) {
            console.log("__________TURN CHANGEd INITIALLY___________");
            dispatch(changeTurn());
          }
          alert("your partner is " + response.payload.partner.name);
          dispatch(pickName2(response.payload.partner.name));
          dispatch(setPartner(response.payload.partner));
          setLoading(false);
          navigation.navigate("Choose");
          Vibration.vibrate();
        }
        if (response.method === "opponent-chosen-cards") {
          console.log(
            "---------------- cards received ----------------",
            response.payload
          );
          dispatch(choose2(response.payload));
        }
        if (response.method === "game-ended") {
          console.log(
            "---------------- GAME ENDED ----------------",
            response.payload
          );
          dispatch(CreateGame());
          navigation.navigate("Play");
        }
        if (response.method === "opponent-play-card") {
          console.log(
            "---------------- play card received ---------------- \n",
            response.payload
          );
          dispatch(pick2(response.payload));
        }
        if (response.method === "turn") {
          dispatch(changeTurn());
          console.log("----------------turn is changed----------------");
          SimpleToast.show("Your Turn");
        }
      };
    },
    [ localSocket ]
  );
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ce1326",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 45,
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "space-mono",
            color: "#fcd116",
          }}
        >
          Finding Match...
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={[ tw`text-2xl text-white  mt-20`, styles.compete ]}>
        Compete To Win New Cards
      </Text>
      <View
        style={[
          tw` absolute bottom-0 w-full flex flex-col  items-center`,
          styles.bottomCont,
        ]}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/pikachu.png")}
        />
        <View
          style={[
            tw` absolute bottom-0 bg-white  flex flex-col justify-center items-center w-full p-20`,
            styles.bottom,
          ]}
        >
          <TextInput
            style={[
              styles.input,
              noName && {
                borderColor: "#ce1326",
                color: "#ce1326",
                borderWidth: 2,
              },
            ]}
            onChangeText={onChangeText}
            value={text}
            placeholder="Player name"
          />

          <Pressable
            //! enable for prod
            // disabled={text === ""}
            onPress={() => {
              connect();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "#F4FD19",
              },
              styles.wrapperCustom,
            ]}
          >
            <Text style={styles.button}>Play Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: " rgb(255,62,62))",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  compete: {
    fontSize: 28,
    fontFamily: "space-mono",
    // color: "#fcd116",
    fontWeight: "bold",
  },

  image: {
    width: 130,
    height: 130,
  },
  wrapperCustom: {
    borderRadius: 8,

    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff01b",
    padding: 10,
    borderRadius: 15,
  },
  input: {
    color: "#3b3a29",
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  bottomCont: {
    backgroundColor: " rgb(255,62,62))",
    height: "46%",
  },
  bottom: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});

//? old code for socket io connection
// if (globalSocket.connected) {
//   globalSocket.emit("join-me");
//   globalSocket.on("disconnect", () => {
//     console.log("----------------------------------disconnected");
//   });
//   globalSocket.on("joined", (room: any) => {
//     const opponent = getPartner(room, globalSocket);
//     console.log(
//       "--------------------------------partner from play.tsx",
//       opponent
//     );
//     dispatch(setPartner(opponent));
//     //salam
//     globalSocket.emit("message", " salam");
//     globalSocket.on("message-received", (msg: any) => {
//       console.log("--------------------------from", msg);
//     });
//     dispatch(setPartner(opponent));
//     navigation.navigate("Choose");
//     Vibration.vibrate();
//     Alert.alert("Your opponent is ", opponent.name);
//   });
// }
