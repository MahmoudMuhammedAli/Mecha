import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { attack } from "../redux/Game";
const Fire = require("../assets/images/Fire.png");
const Water = require("../assets/images/Water.png");
const Colorless = require("../assets/images/Colorless.png");
const Psychic = require("../assets/images/Psychic.png");
const cardback = require("../assets/images/cardback.png");

//TODO change ID to order
interface Props {
  width: string | number;
  order?: number;
  height: string | number;
  id: number;
  deck?: boolean;
  flipped?: boolean;
  //data
  cardName: string;
  type: string;
  HP: number;
  attack: number;
}
const Card: React.FC<Props> = (Props) => {
  const { width, height, id, flipped, type, HP, attack, cardName } = Props;
  // const background = require(`../assets/images/${type}.png`);
  const getBackground = () => {
    switch (type) {
      case "Fire":
        return Fire;

      case "Water":
        return Water;
      case "Psychic":
        return Psychic;

      case "Phsychic":
        return Psychic;

      case "Colorless":
        return Colorless;
      default:
        return cardback;
    }
  };
  return (
    <View>
      {flipped ? (
        <View style={[ { width, height } ]}>
          <ImageBackground
            style={[ styles.cardFace, tw`relative` ]}
            source={getBackground()}
          >
            {type !== "cardBack" && (
              <View>
                <Text
                  style={[
                    tw`text-right  font-bold text-black text-xs  `,
                    styles.hp,
                  ]}
                >
                  {HP}
                </Text>
                <Text style={[ styles.attack ]}>Attack :{attack}</Text>
              </View>
            )}
          </ImageBackground>
        </View>
      ) : (
        <Image
          style={[
            { width, height },
            // { transform: [ { translateX: deck ? order * -50 : 0 } ] },
          ]}
          source={require("../assets/images/cardback.png")}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cardFace: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  hp: {
    marginTop: "2%",
    marginRight: "15%",
  },
  attack: {
    marginTop: "70%",
    marginLeft: "10%",
  },
});

export default Card;
